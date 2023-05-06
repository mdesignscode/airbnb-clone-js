import { use } from "react";
const State = require('../../../models/state');

async function getStates () {
  const storage = require('../../../models');
  return await storage.all(State);
}

export default function Page ({ params: { id } }) {
  // get states from storage
  const states = use(getStates());

  // create a new State instance
  const state = new State(states[`State.${id}`]);

  // get list of cities linked to state
  const cities = use(state.cities);

  // sort list of cities
  const sortedCities = Object.values(cities).sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return (
    states[`State.${id}`] ? (
      <>
        <h1>{state.name}</h1>
        <h3>Cities</h3>
        <ul>
          {
            sortedCities.map(({ name, id }) => {
              return <li id={id} key={id} style={{ marginLeft: '2em' }}>
                {id}: {name}
              </li>;
            })
          }
        </ul>
      </>

    ) : <h1>Not found!</h1>
  );
}
