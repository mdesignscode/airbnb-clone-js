#!/usr/bin/node
// Test City Class
const City = require("../../models/city");
const { assert } = require('chai');
const BaseModelTestSuite = require("./testBaseModel");

class CityTest extends BaseModelTestSuite {
  constructor () {
    super();
    this.model = new City();
  }

  tests () {
    describe('City', () => {
      it('should create a City instance with the given name', () => {
        const city = new City({ name: 'Katifkuh' });
        assert.strictEqual(city.name, 'Katifkuh');
      });

      it('should have a name and stateId properties after creation', () => {
        assert.exists(this.model.stateId);
        assert.exists(this.model.name);
      });
    });
  }
}

const testCity = new CityTest();
testCity.tests();
