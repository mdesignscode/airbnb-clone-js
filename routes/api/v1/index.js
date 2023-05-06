#!/usr/bin/node
// api v1

const express = require('express');
const router = express.Router();
const storage = require('../../../models');

const Classes = {};
["amenity", "city", "place",
  "review", "state", "user"].forEach(cls => {
    const Class = require('../../../models/' + cls);
    Classes[cls] = Class;
  });

router.get('/status', (req, res) => {
  res.json({ status: 'OK' });
});

router.get('/stats', async (req, res) => {
  res.json({
    amenities: await storage.count(Classes.amenity),
    cities: await storage.count(Classes.city),
    places: await storage.count(Classes.place),
    reviews: await storage.count(Classes.review),
    states: await storage.count(Classes.state),
    users: await storage.count(Classes.user)
  });
});

// places search
router.post('/places_search', async (req, res) => {
  const data = req.body;
  const all = await storage.all(Classes.place);
  const allPlaces = Object.values(all);
  const statePlaces = [];
  const cityPlaces = [];
  const amenityPlaces = [];

  const amenities = data.amenities || [];
  const states = data.states || [];
  const cities = data.cities || [];

  const con = [!amenities.length, !states.length, !cities.length];
  if (!Object.keys(data).length || con.every(Boolean)) {
    const placesWithReviews = allPlaces.map(async place => await addDetails(place));
    return Promise.all(placesWithReviews).then(result => res.json(result));
  }

  if (states.length) {
    for (const place of allPlaces) {
      const city = await storage.get(Classes.city, place.cityId);
      if (city && states.includes(city.stateId)) {
        statePlaces.push(place);
      }
    }

    if (Object.keys(data).length === 1) {
      const placesWithReviews = statePlaces.map(async place => await addDetails(place));
      return Promise.all(placesWithReviews).then(result => res.json(result));
    }
  }

  if (cities.length) {
    for (const place of allPlaces) {
      if (cities.includes(place.cityId)) {
        cityPlaces.push(place);
      }
    }

    if (Object.keys(data).length === 1) {
      const placesWithReviews = cityPlaces.map(async place => await addDetails(place));
      return Promise.all(placesWithReviews).then(result => res.json(result));
    }
  }

  if (amenities.length) {
    for (const place of allPlaces) {
      const placeObj = new Classes.place(place);
      const amenitiesList = await placeObj.amenities;
      const amenityCheck = amenitiesList.filter(({ id }) => amenities.includes(id));
      if (amenityCheck.length === amenities.length)
        amenityPlaces.push(place);
    }

    if (Object.keys(data).length === 1 || (!states.length && !cities.length)) {
      const placesWithReviews = amenityPlaces.map(async place => await addDetails(place));
      return Promise.all(placesWithReviews).then(result => res.json(result));
    } else {
      const combinedPlaces = statePlaces.concat(cityPlaces);
      const filteredPlaces = [];

      for (const place of combinedPlaces) {
        const placeObj = new Classes.place(place);
        const amenitiesList = await placeObj.amenities;
        const amenityCheck = amenitiesList.filter(({ id }) => amenities.includes(id));
        if (amenityCheck.length === amenities.length) {
          filteredPlaces.push(place);
        }
      }

      const placesWithReviews = filteredPlaces.map(async place => await addDetails(place));
      return Promise.all(placesWithReviews).then(result => res.json(result));
    }
  }

  const combinedPlaces = statePlaces.concat(cityPlaces);
  const uniquePlaces = Array.from(new Set(combinedPlaces));
  const placesWithReviews = uniquePlaces.map(async place => await addDetails(place));
  return Promise.all(placesWithReviews).then(result => res.json(result));
});

async function addDetails (place) {
  const user = await storage.get(Classes.user, place.userId);
  const placeObj = new Classes.place(place);
  const reviews = await placeObj.reviews;
  const amenities = await placeObj.amenities;
  Object.assign(place, { amenities, reviews, user });
  return place;
}

module.exports = { router, Classes };
