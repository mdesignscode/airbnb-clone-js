"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from './filters.module.css';

export default function Filters ({ setPlaces }) {
  const [states, setStates] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [checkedFilters, setCheckedFilters] = useState({
    amenities: {},
    states: {},
    cities: {}
  });

  const amenitiesRef = useRef();
  const statesRef = useRef();

  // fetch data
  useEffect(() => {
    async function fetchData () {
      const statesReq = await fetch('http://0.0.0.0:3001/api/v1/states');
      const states = await statesReq.json();
      setStates(sortList(states));

      const amenitiesReq = await fetch('http://0.0.0.0:3001/api/v1/amenities');
      const amenities = await amenitiesReq.json();
      setAmenities(sortList(amenities));
    }
    fetchData();
  }, []);

  // display selected filters' names
  useEffect(() => {
    const statesAndCities = Object
      .keys(checkedFilters.states)
      .concat(Object.keys(checkedFilters.cities));
    const stateNames = statesAndCities.length ? statesAndCities.join(', ') : '&nbsp;';
    const displayStates = stateNames.length < 30 ? stateNames : stateNames.slice(0, 29) + '...';
    statesRef.current.innerHTML = displayStates;

    const checkedAmenities = Object.keys(checkedFilters.amenities);
    const amenityNames = checkedAmenities.length ? checkedAmenities.join(', ') : '&nbsp;';
    const displayAmenities = amenityNames.length < 30 ? amenityNames : amenityNames.slice(0, 29) + '...';
    amenitiesRef.current.innerHTML = displayAmenities;
  }, [checkedFilters]);

  function handleCheckedFilters (e) {
    const { checked } = e.target;
    const { id, name, type } = e.target.dataset;
    if (checked) {
      setCheckedFilters(prevState => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          [name]: id
        }
      }));
    } else {
      setCheckedFilters(prevState => {
        const updatedType = { ...prevState[type] };
        delete updatedType[name];
        return {
          ...prevState,
          [type]: updatedType
        };
      });

    }
  }

  return (
    <section className={styles.filters}>
      <div className={styles.locations}>
        <h3>States</h3>
        <h4 ref={statesRef}>&nbsp;</h4>
        <ul className={styles.popover}>
          {
            states.map((state) => {
              const sortedCities = sortList(state.cities);
              return (
                <ul key={state.id}>
                  <h2>
                    <input
                      type="checkbox"
                      data-id={state.id}
                      data-name={state.name}
                      data-type="states"
                      onChange={handleCheckedFilters}
                    />
                    {state.name}
                  </h2>
                  {
                    sortedCities.map(({ name, id }) => {
                      return (
                        <li key={id}>
                          <input
                            type="checkbox"
                            data-id={id}
                            data-name={name}
                            data-type="cities"
                            onChange={handleCheckedFilters}
                          />
                          {name}
                        </li>
                      );
                    })
                  }
                </ul>
              );
            })
          }
        </ul>
      </div>

      <div className={styles.amenities}>
        <h3>Amenities</h3>
        <h4 ref={amenitiesRef}>&nbsp;</h4>
        <ul className={styles.popover}>
          {amenities.map(({ name, id }) => (
            <li key={id}>
              <input
                type="checkbox"
                data-id={id}
                data-name={name}
                data-type="amenities"
                onChange={handleCheckedFilters}
              />
              {name}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={async () => {
          const placesReq = await fetch('http://0.0.0.0:3001/api/v1/places_search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              amenities: Object.values(checkedFilters.amenities),
              cities: Object.values(checkedFilters.cities),
              states: Object.values(checkedFilters.states)
            })
          });
          const placesRes = await placesReq.json();
          await setPlaces(sortList(placesRes))
        }}
        type="button"
      >Search</button>
    </section>
  );
}

function sortList (list) {
  return list.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}
