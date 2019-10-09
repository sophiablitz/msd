"use strict";
/* eslint-disable */
let Person = function () { };
Person.prototype.initialize = function (name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.describe = function () {
  return this.name + ", " + this.age + " years old.";
}
let Student = function () { };
Student.prototype = new Person();
Student.prototype.learn = function (subject) {
  return this.name + " just learned " + subject;
}


let Teacher = function () { };
Teacher.prototype = new Person();
Teacher.prototype.teach = function (subject) {
   return this.name + " is now teaching " + subject;
}

function runMakeStudentAndTeacher(){
  let john = new Student();
  john.initialize("John", 25);
  console.log(john.describe());
  console.log(john.learn("Inheritance"));
  let sophia = new Teacher();
  sophia.initialize("Sophia", 26);
  console.log(sophia.describe());
  console.log(sophia.teach("Inheritance"));
}
