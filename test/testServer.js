#!/usr/bin/node
// Test api

const sinon = require('sinon');
const { createSandbox } = require('sinon');
const { expect } = require('chai');
const storage = require('../models');

let sandbox;
before(function () {
});

before(() => {
  sandbox = createSandbox();

  // clear storage
  if (storage.type !== 'db') {
    const { writeFileSync } = require('fs');
    writeFileSync('file.json', "{}", 'utf-8');
  }
  else {
    const { DBStorage } = require('../models/engine/dbStorage');
    process.env.HBNB_ENV = 'test';
    new DBStorage();
    process.env.HBNB_ENV = undefined;
  }
});

after(() => {
  sandbox.restore();
});

describe('Api: /api/v1/', function () {
  describe('/', function () {
    it('should return an object with the status as OK', async function () {
      const reply = await fetch('http://0.0.0.0:3001/api/v1/status');
      const {status} = await reply.json();
      expect(status).be.equal('OK')
    });
    it('should return an object with the storage count of each class', function () {

    });
  });
});
