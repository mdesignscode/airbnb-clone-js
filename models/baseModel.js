#!/usr/bin/node
// class BaseModel that defines all common attributes/methods for other classes

const storage = require('.');

/**
 * defines all common attributes/methods for other classes
 */
class BaseModel {
  /**
   * initializes instance properties
   * @param  {{}} args an object to initialize the instance
   */
  constructor (...args) {
    if (args[0]) {
      const properties = args[0];
      properties.updatedAt = properties?.updatedAt ? new Date(properties.updatedAt) : new Date();
      properties.createdAt = properties?.createdAt ? new Date(properties.createdAt) : new Date();
      if (!properties?.id) {
        const { v4 } = require('uuid');
        properties.id = v4();
      };
      Object.assign(this, properties);
      delete this.__class__;
    } else {
      const uuid = require('node-uuid');
      const testEnv = process.argv.slice(2)[0];
      const testUUID = process.argv.slice(2)[1];

      if (testEnv === 'test') {
        const { stub } = require('sinon');
        stub(uuid, 'v4').returns(testUUID);
      }
      this.id = uuid.v4();
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }

  [Symbol.for('nodejs.util.inspect.custom')] () {
    return `[${this.constructor.name}] (${this.id}) ${JSON.stringify(this)}`;
  }

  /**
   * Updates the time of an instance
   */
  async save () {
    this.updatedAt = new Date();
    await storage.new(this);
    await storage.save();
  }

  /**
   * Deletes an object from storage
   */
  async delete () {
    await storage.delete(this);
  }
}

module.exports = BaseModel;
