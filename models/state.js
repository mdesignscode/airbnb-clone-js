#!/usr/bin/node
// State Class

const BaseModel = require("./baseModel");

/**
 * Creates a State
 */
class State extends BaseModel {
  constructor (...args) {
    const properties = args[0];
    super(properties);
    this.name = properties?.name ? properties.name : '';
  }

  get cities () {
    const storage = require('.');
    const City = require("./city");

    return new Promise(async (resolve, reject) => {
      try {
        const allCities = await storage.all(City);
        const stateCities = Object.values(allCities).filter(city => city.stateId === this.id);
        resolve(stateCities);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = State;
