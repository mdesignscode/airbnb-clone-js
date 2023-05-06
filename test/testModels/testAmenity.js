#!/usr/bin/node
// Test Amenity Class
const Amenity = require("../../models/amenity");
const { assert } = require('chai');
const BaseModelTestSuite = require("./testBaseModel");

class AmenityTestSuite extends BaseModelTestSuite {
  constructor () {
    super();
    this.model = new Amenity()
  }

  tests () {
    describe('Amenity', () => {

      it('should create an Amenity instance with the given name', () => {
        const amenity = new Amenity({ name: 'Wifi' });
        assert.ok(amenity.name, 'Wifi');
      });

      it('should have a name property after creation', () => {
        assert.exists(this.model.name);
      });
    });
  }
}

const testAmenity = new AmenityTestSuite();
testAmenity.tests();
