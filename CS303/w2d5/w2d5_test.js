"use strict";
/* global assert findSubTree TreeNode abe homer fibonacci*/
describe("findSubTree", function(){
  it("Find element if head of tree", function (){
    assert.deepEqual(findSubTree(abe,"Abe"),abe);
  });
  it("Find element if child of tree", function () {
    assert.deepEqual(findSubTree(abe, "Homer"), homer);
  });
  it("Return null if search term not found", function () {
    assert.equal(findSubTree(abe, "aslkdjf"), null);
  });
});

describe("fibonacci", function () {
  it("n<1 returns null", function () {
    assert.equal(fibonacci(-3), null);
  });
  it("n=1 returns 1", function () {
    assert.equal(fibonacci(1), 1);
  });
  it("n=2 returns 1", function () {
    assert.equal(fibonacci(2), 1);
  });
  it("n=3 returns 2", function () {
    assert.equal(fibonacci(3), 2);
  });
  it("n=10 returns 55", function () {
    assert.equal(fibonacci(10), 55);
  });
});