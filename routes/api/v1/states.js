#!/usr/bin/node
// handles all default RESTFul API actions for a State

const express = require('express');
const router = express.Router();
const { Classes: { state: State, city: City } } = require('.');
const storage = require('../../../models');

// a list of all states
router.get('/', async (req, res) => {
  const statesList = Object.values(await storage.all(State));
  const stateObjects = statesList.map(async state => {
    const stateObj = new State(state);
    const cities = await stateObj.cities;
    const newState = Object.assign({}, stateObj);
    newState.cities = cities;
    return newState;
  });
  Promise.all(stateObjects).then(state => res.json(state));
});

// validate state id and create a state object
router.param('id', async (req, res, next, id) => {
  const stateCheck = await storage.get(State, id);
  if (!stateCheck) res.status(404).json({ error: 'Not found' });
  const state = new State(stateCheck);
  req.state = state;
  next();
});

router
  .route('/:id')
  .get((req, res) => {
    res.json(req.state);
  })
  .delete(async (req, res) => {
    await storage.delete(req.state);
    res.json({});
  })
  .put(async (req, res) => {
    res.json(await storage.updateDict(req.state, req.body));
  });

// create a new state
router.post('/', async (req, res) => {
  if (!req.body.hasOwnProperty('name'))
    res.status(400).send('Missing name');

  try {
    const state = new State(req.body);
    const newState = await storage.new(state);
    res.status(201).json(newState);
  } catch (error) {
    ;
  }
});

// retrieves all cities related to a state
router.get('/:id/cities', async (req, res) => {
  const cities = await req.state.cities;
  res.json(cities);
});

// creates a city related to a state
router.post('/:id/cities', async (req, res) => {
  if (!req.body.hasOwnProperty('name'))
    res.status(400).send('Missing name');

  try {
    req.body.stateId = req.state.id;
    const city = new City(req.body);
    const newCity = await storage.new(city);
    res.status(201).json(newCity);
  } catch (error) {
    ;
  }
});

module.exports = router;
