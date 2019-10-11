"use strict";
/*eslint-disable*/
/**********************
 * CLASS INHERITANCE
 **********************/

/* Error creating an instance *
Here’s the code with Rabbit extending Animal.
Unfortunately, Rabbit objects can’t be created. 

What’s wrong? Rabbit constructor needs to call super(); 'this' isn't available until super is called.
Fix it. */
function runErrorCreatingAnInstance() {

  class Animal {

    constructor(name) {
      this.name = name;
    }

  }

  class Rabbit extends Animal {
    constructor(name) {
      super(name); // my code
      // this.name = name; // problematic code

      this.created = Date.now();
    }
  }

  let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined until change is made
  alert(rabbit.name);
}




/* Extended clock
We’ve got a Clock class. As of now, it prints the time every second. 
Create a new class ExtendedClock that inherits from Clock and 
adds the parameter precision – the number of ms between “ticks”.
Should be 1000(1 second) by default.

Your code should be in the file extended-clock.js
Don’t modify the original clock.js. Extend it.
*/

  
  class ExtendedClock extends Clock {
    constructor(template,precision=1000){
      super(template);
      this.precision = precision;
    }
    start() {
      this.render();
      this.timer = setInterval(()=> {this.render();}, this.precision);
    }
  }
  
let extendedClock;
/**
 * Helper function called from button in index.html
 * @returns {undefined}
 */
function createExtendedClock() {
  extendedClock = new ExtendedClock('h:m:s', +prompt("Enter precision in ms for new clock:"));

}


/**
 * Helper function called from button in index.html
 * @returns {undefined}
 */
function startExtendedClock() {
  extendedClock.start();

}

/**
 * Helper function called from button in index.html
 * @returns {undefined}
 */
function stopExtendedClock() {
  extendedClock.stop();
}




/* Class extends Object ?
As we know, all objects normally inherit from Object.prototype and 
get access to “generic” object methods like hasOwnProperty etc.
For instance: */
function runClassExtendsObjectRabbit1() {
  class Rabbit {
    constructor(name) {
      this.name = name;
    }
  }

  let rabbit = new Rabbit("Rab");

  // hasOwnProperty method is from Object.prototype
  alert(rabbit.hasOwnProperty('name')); // true

}
/* But if we spell it out explicitly like "class Rabbit extends Object", 
then the result would be different from a simple "class Rabbit" ?
  What’s the difference ?

Here’s an example of such code
it doesn’t work – why? super needs to be called in the constructor
fix it ?): */

function runClassExtendsObjectRabbit2() {
  class Rabbit extends Object {
    constructor(name) {
      super();
      this.name = name;
    }
  }

  let rabbit = new Rabbit("Rab");

  alert(rabbit.hasOwnProperty('name')); // true
}