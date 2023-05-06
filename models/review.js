#!/usr/bin/node

const BaseModel = require("./baseModel");

// Review Class

/**
 * Creates a Review
 */
class Review extends BaseModel {
  constructor (...args) {
    const properties = args[0];
    super(properties);
    const placeProperties = {
      placeId: '',
      userId: '',
      text: ''
    };
    if (properties) {
      for (const property of Object.keys(properties))
        if (Object.keys(placeProperties).includes(property))
          this[property] = properties[property];

      for (const property of Object.keys(placeProperties)) {
        if (!Object.keys(properties).includes(property)) {
          this[property] = placeProperties[property];
        }
      }
    } else Object.assign(this, placeProperties);
  }
}

module.exports = Review;
