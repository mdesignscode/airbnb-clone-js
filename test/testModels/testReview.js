#!/usr/bin/node
// Test Review Class
const Review = require("../../models/review");
const { assert } = require('chai');
const BaseModelTestSuite = require("./testBaseModel");

class ReviewTest extends BaseModelTestSuite {
  constructor () {
    super();
    this.model = new Review()
  }

  tests () {
    describe('Review', () => {
      beforeEach(() => {
        this.model = new Review();
      });
      it('should create a Review instance with the given text', () => {
        const review = new Review({ text: 'Et eos sit sed. Similique et adipisci. Praesentium et ut.' });
        assert.strictEqual(review.text, 'Et eos sit sed. Similique et adipisci. Praesentium et ut.');
      });

      it('should have a text, userId, placeId properties after creation', function () {
        const review = new Review();
        assert.exists(review.placeId);
        assert.exists(review.userId);
        assert.exists(review.text);
      });
    });
  }
}

const testReview = new ReviewTest();
testReview.tests();
