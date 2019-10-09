"use strict";

/* eslint-disable */
/* global Teacher, Student, assert*/
describe("Teacher", function () {

  let sophia = new Teacher();
  sophia.initialize("Sophia", 26);
  
  it("can be described", function (){
    assert.equal(sophia.describe(),"Sophia, 26 years old.")
  });
  it("can teach Inheritance", function () {
    assert.equal(sophia.teach("Inheritance"), "Sophia is now teaching Inheritance")
  });
});
describe("Student", function () {

  let john = new Student();
  john.initialize("John", 25);

  it("can be described", function () {
    assert.equal(john.describe(), "John, 25 years old.")
  });
  it("can learn Inheritance", function () {
    assert.equal(john.learn("Inheritance"), "John just learned Inheritance")
  });
});
