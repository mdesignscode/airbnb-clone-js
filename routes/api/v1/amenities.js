#!/usr/bin/node
// handles all default RESTFul API actions for an Amenity

const express = require('express');
const router = express.Router();
const { Classes: { amenity: Amenity } } = require('.');
const storage = require('../../../models');

router.get('/', async (req, res) => {
  const amenitiesList = Object.values(await storage.all(Amenity));
  res.json(amenitiesList);
});

router.param('id', async (req, res, next, id) => {
  const amenityCheck = await storage.get(Amenity, id)
  if (!amenityCheck) res.status(404).json({ error: 'Not found' });
  const amenity = new Amenity(amenityCheck);
  req.amenity = amenity;
  next();
});

router
  .route('/:id')
  .get((req, res) => {
    res.json(req.amenity);
  })
  .delete(async (req, res) => {
    await storage.delete(req.amenity);
    res.json({});
  })
  .put(async (req, res) => {
    res.json(await storage.updateDict(req.amenity, req.body));
  });

router.post('/', async (req, res) => {
  if (!req.body.hasOwnProperty('name'))
    res.status(400).send('Missing name');

  try {
    const amenity = new Amenity(req.body);
    const newAmenity = await storage.new(amenity);
    res.status(201).json(newAmenity);
  } catch (error) {
    ;
  }
});

module.exports = router;
