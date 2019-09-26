"use strict";
/* global calculator*/
describe("calculator", function () {

  context("when 2 and 5 entered", function () {
    beforeEach(function () {
      sinon.stub(window, "prompt");

      prompt.onCall(0).returns("2");
      prompt.onCall(1).returns("5");

      calculator.read();
    });

    afterEach(function () {
      prompt.restore();
    });

    it("the sum is 7", function () {
      assert.equal(calculator.sum(), 7);
    });

    it("the multiplication product is 10", function () {
      assert.equal(calculator.mul(), 10);
    });
  });

});