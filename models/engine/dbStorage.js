#!/usr/bin/node
// Database storage engine

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const classMap = {
  User: 'user', City: 'city', State: 'state', BaseModel: 'baseModel',
  Place: 'place', Amenity: 'amenity', Review: 'review'
};

/**
 * Database storage engine
 */
class DBStorage {

  constructor () {
    if (process.env.HBNB_ENV === 'test') {
      (async () => {
        await prisma.$transaction([
          prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`,
          prisma.$executeRaw`TRUNCATE TABLE Review;`,
          prisma.$executeRaw`TRUNCATE TABLE PlaceAmenity;`,
          prisma.$executeRaw`TRUNCATE TABLE Amenity;`,
          prisma.$executeRaw`TRUNCATE TABLE Place;`,
          prisma.$executeRaw`TRUNCATE TABLE User;`,
          prisma.$executeRaw`TRUNCATE TABLE City;`,
          prisma.$executeRaw`TRUNCATE TABLE State;`,
          prisma.$executeRaw`TRUNCATE TABLE BaseModel;`,
          prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`
        ]);
      })();
    }
  }

  /**
   * Returns all objects of type `Constructor` or all objects in storage
   * @param {Constructor} cls the constructor of the class to retrieve objects from
   * @returns {{}} all objects in storage
   */
  async all (cls) {
    const objects = {};
    if (!cls) {
      for (const cls of Object.keys(classMap)) {
        const result = await prisma[classMap[cls]].findMany();
        for (const obj of result) {
          const key = `${cls}.${obj.id}`;
          objects[key] = obj;
        }
      }
    } else if (classMap[cls.name]) {
      const result = await prisma[classMap[cls.name]].findMany();
      for (const obj of result) {
        const key = `${cls.name}.${obj.id}`;
        objects[key] = obj;
      }
    } else {
      return {};
    }

    for (const obj of Object.values(objects)) {
      delete obj.password;
    }
    return objects;
  }

  /**
   * Adds an object to storage
   * @param {object} obj the object to be added to storage
   * @returns {object} the created object
   */
  async new (obj) {
    try {
      const cls = obj.constructor.name;
      return await prisma[classMap[cls]].create({ data: obj });
    } catch (error) {
      ;
    }
  }

  async save () {
    ;
  }

  /**
   * Removes an object from storage
   * @param {object} obj the object to be destroyed
   */
  async delete (obj) {
    try {
      const cls = obj.constructor.name;
      await prisma[classMap[cls]].delete({
        where: {
          id: obj.id
        }
      });
    } catch (error) {
      ;
    }
  }

  async reload () {
    await prisma.$disconnect();
    await prisma.$connect();
  }

  /**
   * closes the connection to the database
   */
  async close () {
    await prisma.$disconnect();
  }

  /**
   * Updates an object attribute with the given value
   * @param {object} obj the object to be updated
   * @param {string} key the key to be updated
   * @param {string} value the value to update the key with
   * @returns {object} the updated object
   */
  async update (obj, key, value) {
    if (['id', 'createdAt', 'updatedAt'].includes(key)) return;
    try {
      const cls = obj.constructor.name;
      const data = {};
      if (key === 'password') {
        const crypto = require('crypto');
        // create hash object
        const hash = crypto.createHash('sha256');

        // update hash object with the string to be hashed
        hash.update(value);

        // get the hashed value in hexadecimal format
        data[key] = hash.digest('hex');
      } else data[key] = value;
      return await prisma[classMap[cls]].update({
        where: {
          id: obj.id,
        },
        data,
      });
    } catch (error) {
      ;
    }
  }

  /**
   * Updates an object in storage with `dictionary`
   * @param {object} obj the object to be updated
   * @param {object} dictionary the object to be assigned
   * @returns {object} the updated object
   */
  async updateDict (obj, dictionary) {
    Object.keys(dictionary).forEach(key => {
      if (['id', 'created_at', 'updated_at'].includes(key)) return;
    });
    if (dictionary.password) {
      const crypto = require('crypto');
      // create hash object
      const hash = crypto.createHash('sha256');

      // update hash object with the string to be hashed
      hash.update(dictionary.password);

      // get the hashed value in hexadecimal format
      dictionary.password = hash.digest('hex');
    }
    try {
      const cls = obj.constructor.name;
      return await prisma[classMap[cls]].update({
        where: {
          id: obj.id,
        },
        data: dictionary,
      });
    } catch (error) {
      ;
    }
  }

  /**
   * Retrieves an object from a class
   * @param {constructor} cls the cls to retrieve the object from
   * @param {string} id the object's id
   * @returns the object based on the `cls` and `id`
   */
  async get (cls, id) {
    const all = await this.all(cls);
    return all[`${cls.name}.${id}`];
  }

  /**
   * Counts the number of objects in a class or all classes
   * @param {constructor} cls the class to be counted
   * @returns the number of objects in storage
   */
  async count (cls) {
    let count;
    if (cls) {
      const all = await this.all(cls);
      count = Object.keys(all).length;
    } else {
      const all = await this.all();
      count = Object.keys(all).length;
    }

    return count;
  }
}

module.exports = { DBStorage, prisma };
