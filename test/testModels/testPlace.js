#!/usr/bin/node
// Test Place Class
const Place = require("../../models/place");
const { assert } = require('chai');
const BaseModelTestSuite = require("./testBaseModel");

class PlaceTest extends BaseModelTestSuite {
  constructor () {
    super();
    this.model = new Place();
  }
  tests () {
    describe('Place', () => {
      it('should create an Place instance with the given name', () => {
        const city = new Place({ name: 'Motel 8' });
        assert.strictEqual(city.name, 'Motel 8');
      });

      it('should have name, city_id, user_id, description, numberRooms, numberBathrooms, maxGuest, priceByNight, latitude, longitude and amenityIds properties after creation', () => {
        assert.exists(this.model.name);
        assert.exists(this.model.cityId);
        assert.exists(this.model.userId);
        assert.exists(this.model.name);
        assert.exists(this.model.description);
        assert.exists(this.model.numberRooms);
        assert.exists(this.model.numberBathrooms);
        assert.exists(this.model.maxGuest);
        assert.exists(this.model.priceByNight);
        assert.exists(this.model.latitude);
        assert.exists(this.model.longitude);
        if (process.env.HBNB_TYPE_STORAGE !== 'db')
          assert.exists(this.model.amenityIds);
      });

      describe('reviews', () => {
        it('should return a list of all reviews related to a place', async () => {
          const reviews = await this.model.reviews;
          assert.isArray(reviews);
        });
      });

      describe('amenities', () => {
        it('should return a list of all amenities related to a place', async () => {
          const amenities = await this.model.amenities;
          assert.isArray(amenities);
        });
      });
    });
  }
}

const testPlace = new PlaceTest();
testPlace.tests();
