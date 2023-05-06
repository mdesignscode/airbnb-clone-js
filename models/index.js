#!/usr/bin/node
// initializes the storage object

let storage;
const storageType = process.env.HBNB_TYPE_STORAGE;

if (storageType === 'db') {
  (async () => {
    const { DBStorage } = require("./engine/dbStorage");
    storage = new DBStorage();
    await storage.reload();
  })();
} else {
  const FileStorage = require("./engine/fileStorage");
  storage = new FileStorage();
  storage.reload();
}

storage.type = storageType;

module.exports = storage;
