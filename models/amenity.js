#!/usr/bin/node

const BaseModel = require("./baseModel");

// Amenity Class

/**
 * Creates an Amenity
 */
class Amenity extends BaseModel {
  constructor (...args) {
    const properties = args[0];
    super(properties);
    this.name = properties?.name ? properties.name : '';
  }
}

module.exports = Amenity;
