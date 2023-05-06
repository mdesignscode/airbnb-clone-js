#!/usr/bin/node
// Tests the BaseModel class

const { expect } = require('chai');
const sinon = require('sinon');
const storage = require('../../models');
const BaseModel = require('../../models/baseModel');


class BaseModelTestSuite {
  constructor () {
    this.model = new BaseModel();
    this.sandbox = sinon.createSandbox();
  }

  runTests () {
    describe('BaseModel', () => {
      beforeEach(() => {
        this.sandbox.resetHistory();
      });

      afterEach(() => {
        this.sandbox.restore();
      });

      describe('constructor', () => {
        it('should create a new BaseModel object, with properties id, createdAt, updatedAt', () => {
          expect(this.model.id).to.be.a('string');
          expect(this.model.createdAt).to.be.an.instanceOf(Date);
          expect(this.model.updatedAt).to.be.an.instanceOf(Date);
        });

        it('should create a BaseModel object based on an existing object', function () {
          const obj = new BaseModel({ name: 'TestObject' });
          expect(obj.name).to.be.equal('TestObject');
        });

        it('should add properties id, createdAt, updatedAt if not provided', () => {
          const obj = new BaseModel({ name: 'TestObject' });
          expect(obj.id).to.be.a('string');
          expect(obj.createdAt).to.be.an.instanceOf(Date);
          expect(obj.updatedAt).to.be.an.instanceOf(Date);
        });
      });

      describe('save', () => {
        it('should update the updatedAt property', () => {
          const currentTime = this.model.updatedAt;
          this.model.save();
          expect(currentTime).to.be.lessThan(this.model.updatedAt);
        });

        it('should add an object to storage', async () => {
          const newSpy = this.sandbox.spy(storage, 'new');
          const saveSpy = this.sandbox.spy(storage, 'save');
          await this.model.save();
          expect(newSpy.calledOnceWith(this.model)).to.be.true;
          expect(saveSpy.called).to.be.true;
          newSpy.restore();
          saveSpy.restore();
        });
      });

      describe('delete', () => {
        it('should delete an object from storage', async () => {
          const deleteSpy = this.sandbox.spy(storage, 'delete');
          await this.model.delete();
          expect(deleteSpy.calledOnceWith(this.model)).to.be.true;
        });
      });
    });
  }
}

const testBaseModel = new BaseModelTestSuite();
testBaseModel.runTests();

module.exports = BaseModelTestSuite;
