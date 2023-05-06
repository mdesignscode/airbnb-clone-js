#!/usr/bin/node

const BaseModel = require("./baseModel");

// User Class

/**
 * Creates a User
 */
class User extends BaseModel {
  constructor (...args) {
    const properties = args[0];
    super(properties);
    const userProperties = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    if (properties) {
      for (const property of Object.keys(properties))
        if (Object.keys(userProperties).includes(property)) {
          if (property === 'password') {
            const crypto = require('crypto');
            // create hash object
            const hash = crypto.createHash('sha256');

            // update hash object with the string to be hashed
            hash.update(properties[property]);

            // get the hashed value in hexadecimal format
            this.password = hash.digest('hex');
          } else this[property] = properties[property];
        }

      for (const property of Object.keys(userProperties)) {
        if (!Object.keys(properties).includes(property)) {
          this[property] = userProperties[property];
        }
      }
    } else Object.assign(this, userProperties);
  }
}

module.exports = User;
