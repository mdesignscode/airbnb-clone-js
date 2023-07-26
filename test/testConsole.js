const { expect, assert } = require('chai');
const { spawn } = require('child_process');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const storage = require('../models');
const fs = require('fs');
const User = require('../models/user');

chai.use(chaiAsPromised);

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
  // Utility function to run the CLI with a given input and return the output
  const runCLI = (input, done) => {
    return new Promise((resolve, reject) => {
      const cli = spawn('./console.js', [], { shell: true });
      let output = '';

      cli.stdout.on('data', (data) => {
        output += data;
        output = output.replace('(hbnb) ', '').replace('(hbnb)', '').replace('\n', '');
      });

      cli.on('close', () => {
        resolve(output);
      });

      cli.on('error', reject);

      cli.stdin.write(`${input}\n`);
      cli.stdin.end();

      // finish async function
      if (done) done();
    });
  };

  describe('create <class name>', function () {
    it("Should create a new instance of <class name> and print the instance's id", function (done) {
      const className = 'User';
      const input = `create ${className} id="TestUser"`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals('TestUser');
    });

    it("Should display '** class name missing **' when no class name is provided", function (done) {
      const promise = runCLI('create', done);

      return expect(promise).to.eventually.equals('** class name missing **');
    });

    it("Should display `** class doesn't exist **` when class name is invalid", function (done) {
      const className = 'InvalidClass';
      const input = `create ${className}`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** class doesn't exist **");
    });

    it('Should create an instance of class name initialized with given parameters', function (done) {
      const className = 'User';
      const input = `create ${className} id="TestUser" name="Test_User" age=28 rate=2.5`;
      const promise = runCLI(input, done);

      const model = storage.get(User, 'TestUser');

      assert.strictEqual(model.name, 'Test User');
      assert.strictEqual(model.age, 28);
      assert.strictEqual(model.rate, 2.5);

      return expect(promise).to.eventually.equals("TestUser");
    });
  });

  describe('destroy <class name> <id>', function () {
    it('Should delete an object based on the class name and id', function (done) {
      const className = 'User';
      let input = `create ${className} id="TestUser"`;
      runCLI(input);
      const id = 'TestUser';
      input = `destroy ${className} ${id}`;
      runCLI(input, done);

      const model = storage.get(User, 'TestUser');

      return expect(model).to.eventually.be.undefined;
    });

    it("Should display `** class name missing **` when no class name is provided", function (done) {
      const promise = runCLI('destroy', done);

      return expect(promise).to.eventually.equals('** class name missing **');
    });

    it("Should display `** class doesn't exist **` when class name is invalid", function (done) {
      const className = 'InvalidClass';
      const input = `destroy ${className}`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** class doesn't exist **");
    });

    it("Should display '** instance id missing **' when no instance id is provided", function (done) {
      const className = 'User';
      const input = `destroy ${className}`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** instance id missing **");
    });

    it("Should display '** no instance found **' when instance with <id> is not found", function (done) {
      const className = 'User';
      const input = `destroy ${className} InvalidID`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** no instance found **");
    });

  });

  describe('show <class name> <id>', function () {
    // TODO: add check for output
    it("Should display `** class name missing **` when no class name is provided", function (done) {
      const promise = runCLI('show', done);

      return expect(promise).to.eventually.equals('** class name missing **');
    });

    it("Should display '** instance id missing **' when no instance id is provided", function (done) {
      const className = 'User';
      const input = `show ${className}`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** instance id missing **");
    });

    it("Should display '** no instance found **' when instance with <id> is not found", function (done) {
      const className = 'User';
      const input = `show ${className} InvalidID`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** no instance found **");
    });
  });

  describe('all || all <class name>', function () {
    it("Should display `** class doesn't exist **` when class name is invalid", function (done) {
      const className = 'InvalidClass';
      const input = `all ${className}`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** class doesn't exist **");
    });
  });

  describe('update <class name> <id> <attribute name> <attribute value>', function () {
    it('should update an instance of a model', function (done) {
      const className = 'User';
      let input = `create ${className} id="TestUser"`;
      runCLI(input);
      const id = 'TestUser';
      const attributeName = 'name';
      const attributeValue = 'Updated_User';
      input = `update ${className} ${id} ${attributeName} "${attributeValue}"`;
      runCLI(input, done);

      const model = storage.get(User, 'TestUser');

      return assert.strictEqual(model.name, 'Updated User');
    });

    it("Should display `** class name missing **` when no class name is provided", function (done) {
      const promise = runCLI('update', done);

      return expect(promise).to.eventually.equals('** class name missing **');
    });

    it("Should display `** class doesn't exist **` when class name is invalid", function (done) {
      const className = 'InvalidClass';
      const input = `update ${className}`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** class doesn't exist **");
    });

    it("Should display '** instance id missing **' when no instance id is provided", function (done) {
      const className = 'User';
      const input = `update ${className}`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** instance id missing **");
    });

    it("Should display '** no instance found **' when instance with <id> is not found", function (done) {
      const className = 'User';
      const input = `update ${className} InvalidID`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** no instance found **");
    });

    it("Should display '** attribute name missing **' when no attribute name is provided", function (done) {
      const className = 'User';
      const input = `update ${className} TestUser`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** attribute name missing **");
    });

    it("Should display '** value missing **' when attribute value is not provided", function (done) {
      const className = 'User';
      const input = `update ${className} TestUser name`;
      const promise = runCLI(input, done);

      return expect(promise).to.eventually.equals("** value missing **");
    });

    it('Should update an object`s attribute with given value and ignore other arguments', function (done) {
      const className = 'User';
      const id = 'TestUser';
      const attributeName = 'name';
      const attributeValue = 'Updated_User';
      input = `update ${className} ${id} ${attributeName} "${attributeValue}" foo bar`;
      runCLI(input, done);

      const model = storage.get(User, 'TestUser');

      return assert.strictEqual(model.name, 'Updated User');
    });

  });

  describe('extra actions', function () {
    it("Should display `** class doesn't exist **` when class name is invalid", function (done) {
      const promise = runCLI('InvalidClass.someCommand()', done);

      return expect(promise).to.eventually.equals("** class doesn't exist **");
    });

    describe("<class name>.update(<id>, <attribute name>, <attribute value>)", function () {
      it("Should display '** instance id missing **' when no instance id is provided", function (done) {
        const className = 'User';
        const id = 'TestUser';
        const input = `create ${className} ${id}`;
        runCLI(input);
        const promise = runCLI('User.update()', done);

        return expect(promise).to.eventually.equals('** instance id missing **');
      });

      it("Should display '** no instance found **' when instance with <id> is not found", function (done) {
        const promise = runCLI('User.update("InvalidID")', done);

        return expect(promise).to.eventually.equals('** no instance found **');
      });

      it("Should display '** attribute name missing **' when no attribute name is provided", function (done) {
        const promise = runCLI('User.update(TestUser)', done);

        return expect(promise).to.eventually.equals('** attribute name missing **');
      });

      it("Should display '** value missing **' when attribute value is not provided", function (done) {
        const promise = runCLI('User.update(TestUser name)', done);

        return expect(promise).to.eventually.equals('** value missing **');

      });

      it('Should update an object`s attribute with given value', function (done) {
        const id = 'TestUser';
        const attributeName = 'name';
        const attributeValue = 'Updated_User';
        const input = `User.update(${id}, ${attributeName}, "${attributeValue}")`;
        runCLI(input, done);

        const model = storage.get(User, 'TestUser');

        return assert.strictEqual(model.name, 'Updated User');
      });
    });

    describe("<class name>.update(<id>, {dictionary representation})", function () {
      it('Should update an object with given dictionary representation', function (done) {
        const id = 'TestUser';
        const attributeName = 'firstName';
        const attributeValue = 'Updated_User';
        runCLI('create User TestUser');
        const input = `User.update(${id}, {"${attributeName}": "${attributeValue}"})`;
        runCLI(input, done);

        const model = storage.get(User, 'TestUser');

        assert.strictEqual(model.firstName, 'Grace');
      });
    });

    describe('<class name>.count()', function () {
      it('Should count the number of objects based on class name', function (done) {
        const className = 'User';
        let input = `create ${className}`;
        runCLI(input);
        runCLI(input);
        runCLI(input);
        input = `${className}.count()`;
        const promise = runCLI(input, done);

        return expect(promise).to.eventually.equals('3');
      });
    });

    describe("<class name>.destroy(<id>)", function () {
      it("Should display '** instance id missing **' when no instance id is provided", function (done) {
        const className = 'User';
        const input = `${className}.destroy()`;
        const promise = runCLI(input, done);

        return expect(promise).to.eventually.equals("** instance id missing **");
      });

      it("Should display '** no instance found **' when instance with <id> is not found", function (done) {
        const className = 'User';
        const input = `${className}.destroy(InvalidID)`;
        const promise = runCLI(input, done);

        return expect(promise).to.eventually.equals("** no instance found **");
      });

      it('Should delete an object based on the class name and id', function (done) {
        const className = 'User';
        let input = `create ${className} id="TestUser"`;
        runCLI(input);
        const id = 'TestUser';
        input = `destroy ${className} ${id}`;
        runCLI(input, done);

        const model = storage.get(User, 'TestUser');

        return expect(model).to.eventually.be.undefined;
      });
    });
  });
});
