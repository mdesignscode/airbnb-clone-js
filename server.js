#!/usr/bin/node
// api server

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const express = require('express');
const cors = require('cors');
const { router: v1Router } = require('./routes/api/v1/');
const statesRouter = require('./routes/api/v1/states');
const citiesRouter = require('./routes/api/v1/cities');
const amenitiesRouter = require('./routes/api/v1/amenities');
const usersRouter = require('./routes/api/v1/users');
const placesRouter = require('./routes/api/v1/places');
const reviewsRouter = require('./routes/api/v1/reviews');

const swaggerDocument = YAML.load('./routes/api/v1/docs/swagger.yaml');

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  path: '/api/v1/**'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/', v1Router);
app.use('/api/v1/states', statesRouter);
app.use('/api/v1/cities', citiesRouter);
app.use('/api/v1/amenities', amenitiesRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/places', placesRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});
app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    res.status(400).send('Not a JSON');
  } else {
    next();
  }
});

app.listen(3001);
