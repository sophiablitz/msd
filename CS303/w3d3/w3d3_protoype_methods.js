"use strict";
/*eslint-disable*/
/**************************
 * PROTOTYPE METHODS
 **************************/

/* Add toString to the dictionary
There’s an object dictionary, created as Object.create(null), to store any key / value pairs.

Add method dictionary.toString() into it, that should return a comma - delimited list of keys.
Your toString should not show up in for..in over the object.

Here’s how it should work: */

function runAddToStringToTheDictionary() {
  let dictionary = Object.create(null);

  // your code to add dictionary.toString method
  dictionary.toString = function () {
    let output = "";
    for (let key in dictionary) {
      if (key != 'toString') { output += `${key}: ${dictionary[key]}, `; }
    }
    return output;
  };
  // add some data
  dictionary.apple = "Apple";
  dictionary.__proto__ = "test"; // __proto__ is a regular property key here

  // only apple and __proto__ are in the loop
  for (let key in dictionary) {
    alert(key); // "apple", then "__proto__"
  }

  // your toString in action
  alert(dictionary.toString()); // "apple,__proto__"
}
function runSolutionAddToStringToTheDictionary() {
  let dictionary = Object.create(null, { toString: { value() { return Object.keys(this).join(', ') } } });
  // add some data
  dictionary.apple = "Apple";
  dictionary.__proto__ = "test"; // __proto__ is a regular property key here

  // only apple and __proto__ are in the loop
  for (let key in dictionary) {
    alert(key); // "apple", then "__proto__"
  }

  // your toString in action
  alert(dictionary.toString()); // "apple,__proto__"
}




/* The difference between calls
Let’s create a new rabbit object: */
function runTheDifferenceBetweenCalls1() {

  function Rabbit(name) {
    this.name = name;
  }
  Rabbit.prototype.sayHi = function () {
    alert(this.name);
  };
  let rabbit = new Rabbit("Rabbit");
  // These calls do the same thing or not ?
  rabbit.sayHi(); // Rabbit
  Rabbit.prototype.sayHi(); // undefined
  Object.getPrototypeOf(rabbit).sayHi(); // undefined
  rabbit.__proto__.sayHi(); // undefined

}