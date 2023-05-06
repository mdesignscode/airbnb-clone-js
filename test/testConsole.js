#!/usr/bin/node
// Tests the console

const { execCommand } = require('cli-testlab');
const fs = require('fs');
const { assert } = require('chai');
const { DBStorage } = require('../models/engine/dbStorage');
const storage = require('../models');
const sinon = require('sinon');

let sandbox;

before(function () {
  // clear storage
  if (storage.type !== 'db')
    fs.writeFileSync('file.json', "{}", 'utf-8');

  else {
    process.env.HBNB_ENV = 'test';
    new DBStorage();
    process.env.HBNB_ENV = undefined;
  }
});

after(function () {
  // clear storage
  if (storage.type !== 'db')
    fs.writeFileSync('file.json', "{}", 'utf-8');

  else {
    process.env.HBNB_ENV = 'test';
    new DBStorage();
    process.env.HBNB_ENV = undefined;
  }
});

describe('HBNB CLI', function () {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    if (storage.type !== 'db')
      fs.writeFileSync('file.json', "{}", 'utf-8');
  });
  afterEach(() => {
    sandbox.restore();
  });
  this.timeout(15000);
  describe('create <class name>', function () {
    it("Should create a new instance of <class name> and print the instance's id", async function () {
      const { stdout } = await execCommand('echo "create User" | node console.js test 9799fc9e-4138-5433-a3bb-9cb0d583eed4');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '9799fc9e-4138-5433-a3bb-9cb0d583eed4');
    });

    it("Should display '** class name missing **' when no class name is provided", async function () {
      const { stdout } = await execCommand('echo "create" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** class name missing **');
    });

    it("Should display `** class doesn't exist **` when class name is invalid", async function () {
      const { stdout } = await execCommand('echo "create InvalidClass" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, "** class doesn't exist **");
    });

    it('Should create an instance of class name initialized with given parameters', async function () {
      if (storage.type !== 'db') {
        const { stdout } = await execCommand(`echo 'create BaseModel id="TestBaseModel" name="Test_BaseModel" age=28 rate=2.5' | node console.js`);
        const model = storage.all()['BaseModel.TestBaseModel'];
        const message = stdout.replaceAll('(hbnb)', '').trim();
        assert.strictEqual(message, 'TestBaseModel');
        assert.strictEqual(model.name, 'Test BaseModel');
        assert.strictEqual(model.age, 28);
        assert.strictEqual(model.rate, 2.5);
      } else {
        const { stdout } = await execCommand(`echo 'create User id="TestUser" firstName="Test" lastName="User" email="testuser@console.js" password="testpassword"' | node console.js`);
        const all = await storage.all();
        const model = all['User.TestUser'];
        const message = stdout.replaceAll('(hbnb)', '').trim();
        assert.strictEqual(message, 'TestUser');
        assert.strictEqual(model.firstName, 'Test');
        assert.strictEqual(model.lastName, 'User');
        assert.strictEqual(model.email, 'testuser@console.js');
        assert.strictEqual(model.password, 'testpassword');
      }
    });
  });

  describe('destroy <class name> <id>', function () {
    it('Should delete an object based on the class name and id', async function () {
      await execCommand('echo "destroy User 9799fc9e-4138-5433-a3bb-9cb0d583eed4" | node console.js');
      const all = await storage.all();
      assert.notExists(all['User.9799fc9e-4138-5433-a3bb-9cb0d583eed4']);
    });

    it("Should display `** class name missing **` when no class name is provided", async function () {
      const { stdout } = await execCommand('echo "destroy" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** class name missing **');
    });

    it("Should display `** class doesn't exist **` when class name is invalid", async function () {
      const { stdout } = await execCommand('echo "destroy InvalidClass" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, "** class doesn't exist **");
    });

    it("Should display '** instance id missing **' when no instance id is provided", async function () {
      const { stdout } = await execCommand('echo "destroy User" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** instance id missing **');
    });

    it("Should display '** no instance found **' when instance with <id> is not found", async function () {
      const { stdout } = await execCommand('echo "destroy User InvalidID" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** no instance found **');
    });

  });

  describe('show <class name> <id>', function () {
    it("Should display `** class name missing **` when no class name is provided", async function () {
      const { stdout } = await execCommand('echo "show" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** class name missing **');
    });

    it("Should display `** class doesn't exist **` when class name is invalid", async function () {
      const { stdout } = await execCommand('echo "show InvalidClass" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, "** class doesn't exist **");
    });

    it("Should display '** instance id missing **' when no instance id is provided", async function () {
      const { stdout } = await execCommand('echo "show User" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** instance id missing **');
    });

    it("Should display '** no instance found **' when instance with <id> is not found", async function () {
      const { stdout } = await execCommand('echo "show User InvalidID" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** no instance found **');
    });

  });

  describe('all || all <class name>', function () {
    it("Should display `** class doesn't exist **` when class name is invalid", async function () {
      const { stdout } = await execCommand('echo "all InvalidClass" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, "** class doesn't exist **");
    });
  });

  describe('update <class name> <id> <attribute name> <attribute value>', async function () {
    it("Create Test Dummy", async function () {
      return await execCommand('echo "create User" | node console.js test feb77190-054c-5c26-9233-3897ed7c40cb');
    });

    it("Should display `** class name missing **` when no class name is provided", async function () {
      const { stdout } = await execCommand('echo "update" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** class name missing **');
    });

    it("Should display `** class doesn't exist **` when class name is invalid", async function () {
      const { stdout } = await execCommand('echo "update InvalidClass" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, "** class doesn't exist **");
    });

    it("Should display '** instance id missing **' when no instance id is provided", async function () {
      const { stdout } = await execCommand('echo "update User" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** instance id missing **');
    });

    it("Should display '** no instance found **' when instance with <id> is not found", async function () {
      const { stdout } = await execCommand('echo "update User InvalidID" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** no instance found **');
    });

    it("Should display '** attribute name missing **' when no attribute name is provided", async function () {
      const { stdout } = await execCommand('echo "update User feb77190-054c-5c26-9233-3897ed7c40cb" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** attribute name missing **');
    });

    it("Should display '** value missing **' when attribute value is not provided", async function () {
      const { stdout } = await execCommand('echo "update User feb77190-054c-5c26-9233-3897ed7c40cb name" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, '** value missing **');
    });

    it('Should update an object`s attribute with given value and ignore other arguments', async function () {
      await execCommand(`echo 'update User feb77190-054c-5c26-9233-3897ed7c40cb firstName Jack extra args' | node console.js`);
      const all = await storage.all();
      const model = all['User.feb77190-054c-5c26-9233-3897ed7c40cb'];
      assert.strictEqual(model.firstName, 'Jack');
    });

  });

  describe('extra actions', function () {
    it("Should display `** class doesn't exist **` when class name is invalid", async function () {
      const { stdout } = await execCommand('echo "InvalidClass.someCommand()" | node console.js');
      const message = stdout.replaceAll('(hbnb)', '').trim();
      assert.strictEqual(message, "** class doesn't exist **");
    });

    describe("<class name>.update(<id>, <attribute name>, <attribute value>)", function () {
      it("Should display '** instance id missing **' when no instance id is provided", async function () {
        const { stdout } = await execCommand('echo "User.update()" | node console.js');
        const message = stdout.replaceAll('(hbnb)', '').trim();
        assert.strictEqual(message, '** instance id missing **');
      });

      it("Should display '** no instance found **' when instance with <id> is not found", async function () {
        const { stdout } = await execCommand('echo "User.update(InvalidID)" | node console.js');
        const message = stdout.replaceAll('(hbnb)', '').trim();
        assert.strictEqual(message, '** no instance found **');
      });

      it("Should display '** attribute name missing **' when no attribute name is provided", async function () {
        if (storage.type === 'db') {
          process.env.HBNB_ENV = 'test';
          new DBStorage();
          process.env.HBNB_ENV = undefined;
        }
        await execCommand('echo "create User" | node console.js test 02ac3885-778d-575f-ac16-9f9585a13546');
        const { stdout } = await execCommand('echo "User.update(02ac3885-778d-575f-ac16-9f9585a13546)" | node console.js');
        const message = stdout.replaceAll('(hbnb)', '').trim();
        assert.strictEqual(message, '** attribute name missing **');
      });

      it("Should display '** value missing **' when attribute value is not provided", async function () {
        const { stdout } = await execCommand('echo "User.update(02ac3885-778d-575f-ac16-9f9585a13546, name)" | node console.js');
        const message = stdout.replaceAll('(hbnb)', '').trim();
        assert.strictEqual(message, '** value missing **');
      });

      it('Should update an object`s attribute with given value', async function () {
        await execCommand(`echo 'User.update(02ac3885-778d-575f-ac16-9f9585a13546, firstName, "Brian Clark")' | node console.js`);
        const all = await storage.all();
        const model = all['User.02ac3885-778d-575f-ac16-9f9585a13546'];
        assert.strictEqual(model.firstName, 'Brian Clark');
      });
    });

    describe("<class name>.update(<id>, {dictionary representation})", function () {
      it("Create Test Dummy", async function () {
        if (storage.type === 'db') {
          process.env.HBNB_ENV = 'test';
          new DBStorage();
          process.env.HBNB_ENV = undefined;
        }
        return await execCommand('echo "create User" | node console.js test 3d83d1b9-05b0-5498-b8d9-c9e234bb0b0c');
      });

      it('Should update an object with given dictionary representation', async function () {
        await execCommand(`echo 'User.update(3d83d1b9-05b0-5498-b8d9-c9e234bb0b0c, {"firstName": "Grace"})' | node console.js`);
        const all = await storage.all();
        const model = all['User.3d83d1b9-05b0-5498-b8d9-c9e234bb0b0c'];
        assert.strictEqual(model.firstName, 'Grace');
      });
    });

    describe('<class name>.count()', function () {
      it('Should count the number of objects based on class name', async function () {
        const User = require('../models/user');

        await execCommand('echo "create State" | node console.js ; echo "create User" | node console.js');

        let reply;
        reply = await execCommand('echo "User.count()" | node console.js');
        let message = reply.stdout.replaceAll('(hbnb)', '').trim();
        const users = await storage.all(User);
        assert.strictEqual(message, `${Object.keys(users).length}`);

        reply = await execCommand('echo "State.count()" | node console.js');
        message = reply.stdout.replaceAll('(hbnb)', '').trim();
        assert.strictEqual(message, '1');

        reply = await execCommand('echo "City.count()" | node console.js');
        message = reply.stdout.replaceAll('(hbnb)', '').trim();
        assert.strictEqual(message, '0');
      });
    });

    describe("<class name>.destroy(<id>)", function () {
      it("Should display '** instance id missing **' when no instance id is provided", async function () {
        const { stdout } = await execCommand('echo "User.destroy()" | node console.js');
        const message = stdout.replaceAll('(hbnb)', '').trim();
        assert.strictEqual(message, '** instance id missing **');
      });

      it("Should display '** no instance found **' when instance with <id> is not found", async function () {
        const { stdout } = await execCommand('echo "User.destroy(InvalidID)" | node console.js');
        const message = stdout.replaceAll('(hbnb)', '').trim();
        assert.strictEqual(message, '** no instance found **');
      });

      it('Should delete an object based on id', async function () {
        await execCommand('echo "create User" | node console.js test da8b769e-3368-53ee-b01f-af62d6d531a2');

        await execCommand(`echo 'User.destroy(da8b769e-3368-53ee-b01f-af62d6d531a2)' | node console.js`);

        const all = await storage.all();
        const model = all['User.da8b769e-3368-53ee-b01f-af62d6d531a2'];
        assert.isUndefined(model);
      });
    });
  });
});
