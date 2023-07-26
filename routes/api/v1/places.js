#!/usr/bin/node
// handles all default RESTFul API actions for a Place

const express = require('express');
const router = express.Router();
const { Classes: { place: Place, amenity: Amenity } } = require('.');
const storage = require('../../../models');

router.param('id', async (req, res, next, id) => {
  const placeCheck = await storage.get(Place, id);
  if (!placeCheck) res.status(404).json({ error: 'Not found' });
  const place = new Place(placeCheck);
  req.place = place;
  next();
});

router
  .route('/:id')
  .get((req, res) => {
    res.json(req.place);
  })
  .delete(async (req, res) => {
    await storage.delete(req.place);
    res.json({});
  })
  .put(async (req, res) => {
    res.json(await storage.updateDict(req.place, req.body));
  });

// retrieves all reviews related to a place
router.get('/:id/reviews', async (req, res) => {
  const reviews = await req.place.reviews;
  res.json(reviews);
});

// creates a review related to a place
router.post('/:id/reviews', async (req, res) => {
  if (!req.body.hasOwnProperty('name'))
    res.status(400).send('Missing text');

  try {
    req.body.placeId = req.place.id;
    const review = new Place(req.body);
    const newReview = await storage.new(review);
    res.status(201).json(newReview);
  } catch (error) {
    ;
  }
});

// retrieves all amenities related to a place
router.get('/:id/amenities', async (req, res) => {
  const amenities = await req.place.amenities;
  res.json(amenities);
});

// verify amenity id and set amenity object
router.param('amenityId', async (req, res, next, amenityId) => {
  const amenityCheck = await storage.get(Amenity, amenityId);
  if (!amenityCheck) res.status(404).json({ error: 'Not found' });
  const amenity = new Amenity(amenityCheck);
  req.amenity = amenity;

  // check if place has amenity
  const amenities = await req.place.amenities;
  for (const amenity of amenities) {
    if (amenity.id === req.amenity.id) {
      req.hasAmenity = true;
      next();
    }
  }
  next();
});

// place amenities
router
  .route('/:id/amenities/:amenityId')
  .post(async (req, res) => {
    if (req.hasAmenity)
      res.json(req.amenity);
    else {
      req.place.amenities = [req.amenity];
      res.status(201).json(req.amenity);
    }
  })
  .delete(async (req, res) => {
    if (!req.hasAmenity)
      res.status(404).json({ error: 'Not found' });
    else {
      await req.place.dropAmenity(req.amenity);
      res.json({});
    }
  });

module.exports = router;
