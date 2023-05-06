#!/usr/bin/node
// File storage engine

const fs = require('fs');

/**
 * File storage engine
 */
class FileStorage {
  #filePath = 'file.json';
  #objects = {};

  /**
   * Adds an object to storage
   * @param {object} obj the object to be added to storage
   */
  new (obj) {
    this.#objects[`${obj.constructor.name}.${obj.id}`] = Object.assign(obj, { __class__: obj.constructor.name });
  }

  /**
   * Returns all objects of type `Constructor` or all objects in storage
   * @param {Constructor} cls the name of the class to retrieve objects from
   * @returns {{}} all objects in storage
   */
  all (cls) {
    const objects = {};
    if (!cls)
      Object.assign(objects, this.#objects);

    else {
      Object.keys(this.#objects).forEach(obj => {
        if (this.#objects[obj].__class__ === cls.name)
          objects[obj] = this.#objects[obj];
      });
    }

    for (const obj of Object.values(objects)) {
      delete obj.password;
    }
    return objects;
  }

  /**
   * Serializes all objects to storage file
   */
  save () {
    const jsonData = JSON.stringify(this.#objects);
    fs.writeFileSync(this.#filePath, jsonData, "utf-8");
  }

  /**
   * Deserializes objects in file storage
   */
  reload () {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(this.#filePath, "utf-8"));
    } catch (error) {
      data = {};
    }
    Object.assign(this.#objects, data);
  }

  /**
   * Removes an object from storage
   * @param {object} obj the object to be destroyed
   */
  delete (obj) {
    delete this.#objects[`${obj.constructor.name}.${obj.id}`];
    this.save();
  }

  /**
   * reloads the objects in storage
   */
  close () {
    this.reload();
  }

  /**
   * Updates an object attribute with the given value
   * @param {object} obj the object to be updated
   * @param {string} key the key to be updated
   * @param {string} value the value to update the key with
   */
  update (obj, key, value) {
    if (['id', 'created_at', 'updated_at'].includes(key)) return;
    const crypto = require('crypto');
    // create hash object
    const hash = crypto.createHash('sha256');

    // update hash object with the string to be hashed
    hash.update(value);

    this.#objects[`${obj.constructor.name}.${obj.id}`][key] = key === 'password' ? hash.digest('hex') : value;
    this.save();
  }

  /**
   * Updates an object in storage with `dictionary`
   * @param {object} obj the object to be updated
   * @param {object} dictionary the object to be assigned
   */
  updateDict (obj, dictionary) {
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
    Object.assign(
      this.#objects[`${obj.constructor.name}.${obj.id}`], dictionary
    );
    this.save();
  }

  /**
   * Retrieves an object from a class
   * @param {constructor} cls the cls to retrieve the object from
   * @param {string} id the object's id
   * @returns the object based on the `cls` and `id`
   */
  get (cls, id) {
    const all = this.all(cls);
    return all[`${cls.name}.${id}`];
  }

  /**
   * Counts the number of objects in a class or all classes
   * @param {constructor} cls the class to be counted
   * @returns the number of objects in storage
   */
  count (cls) {
    let count;
    if (cls) {
      const all = this.all(cls);
      count = Object.keys(all).length;
    } else {
      const all = this.all();
      count = Object.keys(all).length;
    }

    return count;
  }
}

module.exports = FileStorage;
