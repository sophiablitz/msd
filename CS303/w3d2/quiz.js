"use strict";
// eslint-disable-next-line require-jsdoc, no-unused-vars
function makeCounter() {

  let count = 0;

  return function (inc) {
    if (arguments.length == 0) {
      return count+=1;
    }
    count += inc;
    if (inc > 1) {
      return "Warning:  increment was by value greater than 1: " + count;
    }
    return count;
  };
}
let counter = makeCounter();
console.log(counter());
console.log(counter(3));
console.log(counter(1));
console.log(counter(-2));