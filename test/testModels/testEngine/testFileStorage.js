#!/usr/bin/node
// Tests the FileStorage Class

const FileStorage = require('../../../models/engine/fileStorage');
const storage = require('../../../models');
const fs = require('fs');
const { assert } = require("chai");

describe('FileStorage', () => {
  if (storage.type !== 'db') {
    beforeEach(function () {
      // clear the file storage file before each test
      fs.writeFileSync("file.json", "{}", "utf-8");
    });

    it("should add an object to storage", function () {
      const storage = new FileStorage();
      storage.new({ id: "123", name: "test object" });
      const objects = storage.all();
      assert.equal(Object.keys(objects).length, 1);
      assert.equal(objects["Object.123"].name, "test object");
    });

    it('Should return all objects in storage or only objects from a certain class', function () {
      const storage = new FileStorage();
      storage.new({ id: "123", name: "test object" });
      storage.new({ id: "124", name: "test object 2" });
      let objects = storage.all();
      assert.equal(Object.keys(objects).length, 2);
      storage.new('Test Object');
      objects = storage.all(Object);
      assert.equal(Object.keys(objects).length, 2);
    });

    it("should serialize and deserialize objects", function () {
      const storage = new FileStorage();
      storage.new({ id: "123", name: "test object" });
      storage.save();
      storage.reload();
      const objects = storage.all();
      assert.equal(Object.keys(objects).length, 1);
      assert.equal(objects["Object.123"].name, "test object");
    });

    it("should remove an object from storage", function () {
      const storage = new FileStorage();
      storage.new({ id: "123", name: "test object" });
      storage.delete({ id: "123", name: "test object" });
      const objects = storage.all();
      assert.equal(Object.keys(objects).length, 0);
    });

    it("should update an object attribute", function () {
      const storage = new FileStorage();
      storage.new({ id: "123", name: "test object" });
      storage.update({ id: "123", name: "test object" }, "name", "updated object");
      const objects = storage.all();
      assert.equal(objects["Object.123"].name, "updated object");
    });

    it("should update an object with a dictionary", function () {
      const storage = new FileStorage();
      storage.new({ id: "123", name: "test object" });
      storage.updateDict({ id: "123", name: "test object" }, { name: "updated object", age: 30 });
      const objects = storage.all();
      assert.equal(objects["Object.123"].name, "updated object");
      assert.equal(objects["Object.123"].age, 30);
    });
  };
});
