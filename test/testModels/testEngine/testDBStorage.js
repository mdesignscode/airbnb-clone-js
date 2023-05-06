#!/usr/bin/node
// Tests the DBStorage Class

const { expect } = require('chai');
const { DBStorage, prisma } = require('../../../models/engine/dbStorage');
const User = require('../../../models/user');
describe('DBStorage', () => {
  if (process.env.HBNB_TYPE_STORAGE === 'db') {
    const dbStorage = new DBStorage();

    before(async () => {
      // Connect to the test database
      await prisma.$connect();

      // Clean database
      process.env.HBNB_ENV = 'test';
      new DBStorage();
      process.env.HBNB_ENV = undefined;
    });

    after(async () => {
      // Disconnect from the test database
      await prisma.$disconnect();

      // Clean database
      process.env.HBNB_ENV = 'test';
      new DBStorage();
      process.env.HBNB_ENV = undefined;
    });

    describe('#all', () => {
      it('should return all objects in storage if no class is specified', async () => {
        const objects = await dbStorage.all();
        expect(objects).to.be.an('object');
      });

      it('should return all objects of the specified class', async () => {
        const objects = await dbStorage.all(User);
        expect(objects).to.be.an('object');
      });

      it('should return an empty object if an invalid class is specified', async () => {
        const objects = await dbStorage.all(String);
        expect(objects).to.be.an('object').that.is.empty;
      });

      it('should return an object with objects stored as `className.id: object`', async function () {
        const BaseModel = require('../../../models/baseModel');
        const model = new BaseModel({ id: 'TestModel' });
        await dbStorage.new(model);
        const all = await dbStorage.all();
        expect(all['BaseModel.TestModel']).to.be.an('object');
      });
    });

    describe('#new', () => {
      it('should add the object to storage', async () => {
        const user = new User();
        await dbStorage.new(user);
        const result = await prisma.user.findUnique({ where: { id: user.id } });
        expect(result).to.exist;
      });
    });

    describe('#delete', () => {
      it('should remove the object from storage', async () => {
        const user = new User();
        await dbStorage.new(user);
        await dbStorage.delete(user);
        const result = await prisma.user.findUnique({ where: { id: user.id } });
        expect(result).to.not.exist;
      });
    });

    describe('#update', () => {
      it('should update the specified key with the given value', async () => {
        const user = new User({ firstName: 'Alice' });
        await dbStorage.new(user);
        await dbStorage.update(user, 'firstName', 'Bob');
        const result = await prisma.user.findUnique({ where: { id: user.id } });
        expect(result.firstName).to.equal('Bob');
      });
    });

    describe('#updateDict', () => {
      it('should update the object with the given dictionary', async () => {

      });
    });

    describe('#save', () => {
      it('should commit the current session', async () => {
        // TODO: Write a test case that actually uses #save
      });
    });

    describe('#reload', () => {
      it('should disconnect and reconnect to the database', async () => {
        // TODO: Write a test case that actually uses #reload
      });
    });
  }
});
