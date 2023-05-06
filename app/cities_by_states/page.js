import { use } from "react";
const State = require('../../models/state');

async function getStates () {
  const storage = require('../../models');
  return await storage.all(State);
}

export default function Page () {
  // get states from storage
  const statesInStorage = use(getStates());

  // create a list of state instances
  const states = Object.values(statesInStorage).map(state => new State(state))

  // sort the list
  const sortedStates = Object.values(states).sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <h1>States</h1>
      <ul>
        {
          sortedStates.map(state => {
            const cities = use(state.cities)
            const sortedCities = Object.values(cities).sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            return (<>
              <strong>
                <li id={state.id} key={state.id}>{state.id}: {state.name}</li>
              </strong>
              <ul>
                {
                  sortedCities.map(({ name, id}) => {
                    return <li id={id} key={id} style={{ marginLeft: '2em' }}>
                      {id}: {name}
                      </li>
                  })
                }
              </ul>
            </>);
          })
        }
      </ul>
    </>
  );
}
