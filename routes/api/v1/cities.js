#!/usr/bin/node
// handles all default RESTFul API actions for a City

const express = require('express');
const router = express.Router();
const { Classes: { city: City, place: Place } } = require('.');
const storage = require('../../../models');

router.param('id', async (req, res, next, id) => {
  const cityCheck = await storage.get(City, id)
  if (!cityCheck) res.status(404).json({ error: 'Not found' });
  const city = new City(cityCheck);
  req.city = city;
  next();
});

router
  .route('/:id')
  .get((req, res) => {
    res.json(req.city);
  })
  .delete(async (req, res) => {
    await storage.delete(req.city);
    res.json({});
  })
  .put(async (req, res) => {
    res.json(await storage.updateDict(req.city, req.body));
  });

// retrieves all places related to a city
router.get('/:id/places', async (req, res) => {
  const places = await req.city.places
  res.json(places);
});

// creates a place related to a city
router.post('/:id/places', async (req, res) => {
  if (!req.body.hasOwnProperty('name'))
    res.status(400).send('Missing name');

  try {
    req.body.cityId = req.city.id
    const place = new Place(req.body);
    const newPlace = await storage.new(place);
    res.status(201).json(newPlace);
  } catch (error) {
    ;
  }
});

module.exports = router;
