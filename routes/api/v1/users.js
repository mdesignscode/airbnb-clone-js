#!/usr/bin/node
// handles all default RESTFul API actions for a User

const express = require('express');
const router = express.Router();
const { Classes: { user: User } } = require('.');
const storage = require('../../../models');

router.get('/', async (req, res) => {
  const usersList = Object.values(await storage.all(User));
  res.json(usersList);
});

router.param('id', async (req, res, next, id) => {
  const userCheck = await storage.get(User, id);
  if (!userCheck) res.status(404).json({ error: 'Not found' });
  const user = new User(userCheck);
  req.user = user;
  next();
});

router
  .route('/:id')
  .get((req, res) => {
    res.json(req.user);
  })
  .delete(async (req, res) => {
    await storage.delete(req.user);
    res.json({});
  })
  .put(async (req, res) => {
    res.json(await storage.updateDict(req.user, req.body));
  });

router.post('/', async (req, res) => {
  if (!req.body.hasOwnProperty('email'))
    res.status(400).send('Missing email');
  if (!req.body.hasOwnProperty('password'))
    res.status(400).send('Missing password');

  try {
    const user = new User(req.body);
    const newUser = await storage.new(user);
    res.status(201).json(newUser);
  } catch (error) {
    ;
  }
});

module.exports = router;
