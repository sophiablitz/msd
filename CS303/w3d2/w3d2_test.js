"use strict";
/* global calculator assert*/
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
describe("Accumulator", function () {

  beforeEach(function () {
    sinon.stub(window, "prompt")
  });

  afterEach(function () {
    prompt.restore();
  });

  it("initial value is the argument of the constructor", function () {
    let accumulator = new Accumulator(1);

    assert.equal(accumulator.value, 1);
  });

  it("after reading 0, the value is 1", function () {
    let accumulator = new Accumulator(1);
    prompt.returns("0");
    accumulator.read();
    assert.equal(accumulator.value, 1);
  });

  it("after reading 1, the value is 2", function () {
    let accumulator = new Accumulator(1);
    prompt.returns("1");
    accumulator.read();
    assert.equal(accumulator.value, 2);
  });
});