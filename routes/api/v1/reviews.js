#!/usr/bin/node
// handles all default RESTFul API actions for an Review

const express = require('express');
const router = express.Router();
const { Classes: { review: Review } } = require('.');
const storage = require('../../../models');

router.param('id', async (req, res, next, id) => {
  const reviewCheck = await storage.get(Review, id)
  if (!reviewCheck) res.status(404).json({ error: 'Not found' });
  const review = new Review(reviewCheck);
  req.review = review;
  next();
});

router
  .route('/:id')
  .get((req, res) => {
    res.json(req.review);
  })
  .delete(async (req, res) => {
    await storage.delete(req.review);
    res.json({});
  })
  .put(async (req, res) => {
    res.json(await storage.updateDict(req.review, req.body));
  });

module.exports = router;
