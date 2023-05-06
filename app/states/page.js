import { use } from "react";

async function getStates () {
  const storage = require('../../models');
  const State = require('../../models/state');
  return await storage.all(State);
}

export default function Page () {
  const states = use(getStates());
  const sortedValues = Object.values(states).sort(function (a, b) {
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
          Object.values(sortedValues).map(({ name, id }) => {
            return <li id={id} key={id}>{id}: {name}</li>;
          })
        }
      </ul>
    </>
  );
}
