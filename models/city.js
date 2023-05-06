#!/usr/bin/node

const BaseModel = require("./baseModel");

// City Class

/**
 * Creates an City
 */
class City extends BaseModel {
  constructor (...args) {
    const properties = args[0];
    super(properties);
    const cityProperties = {
      stateId: '',
      name: ''
    };
    if (properties) {
      for (const property of Object.keys(properties))
        if (Object.keys(cityProperties).includes(property))
          this[property] = properties[property];

      for (const property of Object.keys(cityProperties)) {
        if (!Object.keys(properties).includes(property)) {
          this[property] = cityProperties[property];
        }
      }
    } else Object.assign(this, cityProperties);
  }

  get places () {
    const storage = require('.');
    const Place = require("./place");

    return new Promise(async (resolve, reject) => {
      try {
        const allPlaces = await storage.all(Place);
        const cityPlaces = Object.values(allPlaces).filter(place => place.cityId === this.id);
        resolve(cityPlaces);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = City;
