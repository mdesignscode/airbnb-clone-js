"use client";
import styles from './places.module.css';
import PlaceInfo from './PlaceInformation';
import PlaceAmenities from './PlaceAmenities';
import PlaceReviews from './PlaceReviews';
import { useEffect } from 'react';

export default function Places ({ setPlaces, places }) {
  useEffect(() => {
    async function fetchData () {
      const placesReq = await fetch('http://0.0.0.0:3001/api/v1/places_search', {
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
      setPlaces(placesRes);
    }
    fetchData();
  }, []);

  return (
    <section className={styles.places}>
      <h1>Places</h1>

      <div className={styles.places_cards}>
        {
          places.map(place => {
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
          })
        }
      </div>
    </section>
  );
}
