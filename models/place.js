#!/usr/bin/node

const BaseModel = require("./baseModel");
const Amenity = require("./amenity");
const storage = require('.');
const { prisma } = require('./engine/dbStorage');

// Place Class

/**
 * Creates a Place
 */
class Place extends BaseModel {
  constructor (...args) {
    const properties = args[0];
    super(properties);
    const placeProperties = {
      cityId: '',
      userId: '',
      name: '',
      description: '',
      numberRooms: 0,
      numberBathrooms: 0,
      maxGuest: 0,
      priceByNight: 0,
      latitude: 0.0,
      longitude: 0.0,

    };
    if (storage.type !== 'db') {
      placeProperties.amenityIds = [];
    }
    if (properties) {
      for (const property of Object.keys(properties))
        if (Object.keys(placeProperties).includes(property))
          this[property] = properties[property];

      for (const property of Object.keys(placeProperties))
        if (!Object.keys(properties).includes(property))
          this[property] = placeProperties[property];

    } else Object.assign(this, placeProperties);
  }

  /**
   * @returns a list of reviews linked to a place
   */
  get reviews () {
    const Review = require("./review");

    return new Promise(async (resolve, reject) => {
      try {
        const allReviews = await storage.all(Review);
        const placeReviews = Object.values(allReviews).filter(review => review.placeId === this.id);
        resolve(placeReviews);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Links a place with reviews
   *
   * @param {[]} amenities a list of reviews to link a place with
   */
  set reviews (_) {
    ;
  }

  /**
   * @returns a list of amenities linked to a place
   */
  get amenities () {
    if (storage.type === 'db') {
      return new Promise(async (resolve, reject) => {
        try {
          const placeAmenities = await prisma.placeAmenity.findMany({
            where: {
              placeId: this.id
            }
          });
          const all = await storage.all();
          const amenities = placeAmenities.map(({ amenityId }) => all[`Amenity.${amenityId}`]);

          resolve(amenities);
        } catch (error) {
          reject(error);
        }
      });
    } else {
      const allAmenities = storage.all(Amenity);
      const placeAmenities = Object.values(allAmenities).filter(({ id }) => this.amenityIds.includes(id));
      return placeAmenities;
    }
  }

  /**
   * Links a place with amenities
   *
   * @param {[]} amenities a list of amenities to link a place with
   */
  set amenities (amenities) {
    if (!Array.isArray(amenities)) {
      console.log('List of amenities required');
      return;
    }
    if (storage.type === 'db') {
      amenities.forEach(async amenity => {
        try {
          await prisma.placeAmenity.create({
            data: { amenityId: amenity.id, placeId: this.id }
          });
        } catch (error) {
          ;
        }
      });
    } else
      amenities.forEach(amenity => this.amenityIds.push(amenity.id));
  }

  /**
   * removes an amenity from a place
   * @param {object} amenity the amenity to be removed
   */
  async dropAmenity (amenity) {
    if (amenity instanceof Amenity) {
      if (storage.type === 'db') {
        const { prisma } = require('./engine/dbStorage');
        await prisma.placeAmenity.delete({
          where: {
            AND: [
              { placeId: this.id },
              { amenityId: amenity.id }
            ]
          }
        });
      } else {
        const index = this.amenityIds.indexOf(amenity);

        if (index !== -1) {
          this.amenityIds.splice(index, 1);
        }
      }
    }
  }
}

module.exports = Place;
