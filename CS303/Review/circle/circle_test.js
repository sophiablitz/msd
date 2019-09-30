"use strict";
/* global assert circle*/
describe("Circle", function (){
  it("area with radius 2", function(){
    circle.radius = 2;
    assert.equal(circle.area(),12);
  });
  it("circumference with radius 2", function () {
    circle.radius = 2;
    assert.equal(circle.circumference(), 12);
  });
});