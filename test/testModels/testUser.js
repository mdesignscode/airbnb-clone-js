#!/usr/bin/node
// Test User Class
const User = require("../../models/user");
const { assert } = require('chai');
const BaseModelTestSuite = require("./testBaseModel");

class UserTest extends BaseModelTestSuite {
  constructor () {
    super();
    this.model = new User()
  }

  tests () {
    describe('User', () => {
      beforeEach(() => {
        this.model = new User();
      });
      it('should create an User instance with the given first and last names', () => {
        const user = new User({ firstName: 'Tillie', lastName: 'Fitzgerald' });
        assert.strictEqual(user.firstName, 'Tillie');
        assert.strictEqual(user.lastName, 'Fitzgerald');
      });

      it('should have a firstName, lastName, email and password properties after creation', function () {
        const user = new User();
        assert.exists(user.firstName);
        assert.exists(user.lastName);
        assert.exists(user.password);
        assert.exists(user.email);
      });
    });
  }
}
const testUser = new UserTest();
testUser.tests();
