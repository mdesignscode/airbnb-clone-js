"use client";
import styles from './places.module.css';
import PlaceInfo from './PlaceInformation';
import PlaceAmenities from './PlaceAmenities';
import PlaceReviews from './PlaceReviews';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Places ({ setPlaces, places }) {
  useEffect(() => {
    async function fetchData () {
      const placesReq = await fetch('https://airbnb-clone-js-api.onrender.com/api/v1/places_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      const placesRes = await placesReq.json();
      placesRes.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      const noDups = []
      for (let i = 0; i < placesRes.length; i += 2)
        noDups.push(placesRes[i])
      setPlaces(noDups);
    }
    fetchData();
  }, []);

  return (
    <section className={styles.places}>
      <h1>Places</h1>

      <div className={styles.places_cards}>
        {
          places.length ? places.map(place => {
            return (
              <article>
                <div className={styles.card_header}>
                  <h2>{place.name}</h2>
                  <div className={styles.price_by_night}>${place.priceByNight}</div>
                </div>

                <PlaceInfo place={place} />

                <div className={styles.user}><strong>Owner</strong>: {place.user.firstName} {place.user.lastName}</div>
                <div className={styles.description}>{place.description}</div>

                <PlaceAmenities amenities={place.amenities} />
                <PlaceReviews reviews={place.reviews} places={places} />

              </article>
            );
          }) : <div id="loader" style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
              <Image width={142} height={60} src="/logo.png" alt="" />
              <p>API Loading...</p>
            </div>
        }
      </div>
    </section>
  );
}
