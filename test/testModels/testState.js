#!/usr/bin/node
// Test State Class
const State = require("../../models/state");
const { assert } = require('chai');
const BaseModelTestSuite = require("./testBaseModel");

class StateTest extends BaseModelTestSuite {
  constructor () {
    super();
    this.model = new State();
  }
  tests () {
    describe('State', () => {
      it('should create a State instance with the given name', () => {
        const city = new State({ name: 'Motel 8' });
        assert.strictEqual(city.name, 'Motel 8');
      });

      it('should have a name property after creation', () => {
        assert.exists(this.model.name);
      });

      describe('cities', () => {
        it('should return a list of all cities related to a state', async () => {
          const cities = await this.model.cities;
          assert.isArray(cities);
        });
      });
    });
  }
}

const state = new StateTest();
state.tests();
