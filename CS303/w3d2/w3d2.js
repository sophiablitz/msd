/* eslint-disable require-jsdoc */
"use strict";


/*******************************
 * PROTOTYPAL INHERITANCE TASKS
 *******************************/
/* Working with prototype
Here’s the code that creates a pair of objects, then modifies them.
Which values are shown in the process ?
There should be 3 answers.*/

function runWorkingWithPrototype() {
  let animal = {
    jumps: null
  };
  let rabbit = {
    __proto__: animal,
    jumps: true
  };

  alert(rabbit.jumps); // true (1)
  delete rabbit.jumps;
  alert(rabbit.jumps); // null (2)
  delete animal.jumps;
  alert(rabbit.jumps); // undefined // wrong and understood because I misread the code. Correct answer is null (3)
}

/* Searching algorithm
The task has two parts.
Use __proto__ to assign prototypes in a way that any property 
lookup will follow the path: pockets → bed → table → head.
For instance, pockets.pen should be 3(found in table), 
and bed.glasses should be 1(found in head).

Answer the question: is it faster to get glasses 
as pockets.glasses or head.glasses ? Benchmark if needed.
  On first thought I would guess it is faster to get properties 
  directly from an object, as it doesn't require searching the prototype chain.
  However, after testing, I see no significant difference in performance between the two options. 

We have objects: */

function runSearchingAlgorithm() {

  let head = {
    glasses: 1
  };
  let table = {
    pen: 3,
    __proto__: head
  };
  let bed = {
    sheet: 1,
    pillow: 2,
    __proto__: table
  };
  let pockets = {
    money: 2000,
    __proto__: bed
  };
  alert(`pockets.pen should be 3: ${pockets.pen}`);
  alert(`bed.glasses should be 1: ${bed.glasses}`);
}
function runSearchingAlgorithmTimeTest() {

  let head = {
    glasses: 1
  };
  let table = {
    pen: 3,
    __proto__: head
  };
  let bed = {
    sheet: 1,
    pillow: 2,
    __proto__: table
  };
  let pockets = {
    money: 2000,
    __proto__: bed
  };
  // declare testing variables
  let start, val, totalTime, avgTime;
  let data;

  console.log("10,000,000 trials of accessing a property on an object.");
  data = [];
  for (let i = 0; i < 10000000; i++) {
    start = Date.now();
    val = head.glasses;
    data.push(Date.now() - start);
  }
  totalTime = data.reduce((out, val) => out += val, 0);
  avgTime = totalTime / 10000000;
  console.log(`Total Time with direct: ${totalTime}. AverageTime: ${avgTime}`);

  console.log("10,000,000 trials accessing a property on an object down the prototype chain.");
  data = [];
  for (let i = 0; i < 10000000; i++) {
    start = Date.now();
    val = pockets.glasses;
    data.push(Date.now() - start);
  }
  totalTime = data.reduce((out, val) => out += val, 0);
  avgTime = totalTime / 10000000;
  console.log(`Total Time with chain: ${totalTime}. AverageTime: ${avgTime}`);

  console.log("Repeat: 10,000,000 trials of accessing a property on an object.");
  data = [];
  for (let i = 0; i < 10000000; i++) {
    start = Date.now();
    val = head.glasses;
    data.push(Date.now() - start);
  }
  totalTime = data.reduce((out, val) => out += val, 0);
  avgTime = totalTime / 10000000;
  console.log(`Total Time with direct: ${totalTime}. AverageTime: ${avgTime}`);

  console.log("Repeat: 10,000,000 trials accessing a property on an object down the prototype chain.");
  data = [];
  for (let i = 0; i < 10000000; i++) {
    start = Date.now();
    val = pockets.glasses;
    data.push(Date.now() - start);
  }
  totalTime = data.reduce((out, val) => out += val, 0);
  avgTime = totalTime / 10000000;
  console.log(`Total Time with chain: ${totalTime}. AverageTime: ${avgTime}`);

  console.log("Conclusion: no performance difference.");
}

/* Where it writes ?
We have rabbit inheriting from animal.
If we call rabbit.eat(), which object receives the full property: animal or rabbit ?
  The property will write to the object before the dot operator when the 
  method 'eat' is invoked. Therefore, the rabbit will have written the property 'full'. */

function runWhereItWrites() {
  let animal = {
    eat() {
      this.full = true;
    }
  };
  let rabbit = {
    __proto__: animal
  };
  rabbit.eat();
  console.log("The rabbit object:");
  console.log(rabbit);
  console.log("The animal object:");
  console.log(animal);
}

/* Why two hamsters are full?
We have two hamsters: speedy and lazy inheriting from the general hamster object.

When we feed one of them, the other one is also full. Why? 
  The array object is the same object refered to in both examples of the hamsters.

How to fix it? 
  Assigning a new array object in the eat() method.
*/

function runWhyTwoHamstersArefull() {

  let hamster = {
    stomach: [],

    eat(food) {
      this.stomach = [food, ...this.stomach]; // this creates a new array obj for each inheriting hamster
    }
  };

  let speedy = {
    __proto__: hamster
  };

  let lazy = {
    __proto__: hamster
  };

  // This one found the food
  console.log("speedy eats an apple:");
  console.log("speedy eats an orange:");

  speedy.eat("apple");
  speedy.eat("orange");
  console.log("speedy.stomach:");
  console.log(speedy.stomach); // apple, orange

  // This one also has it, why? fix please.
  console.log("lazy.stomach:");
  console.log(lazy.stomach); // was apple, but fixed so now empty

  // This one also has it, why? fix please.
  console.log("hamster.stomach:");
  console.log(hamster.stomach); // was apple, but fixed so now empty
}

/*****************************************************************
 * OBJECTS, THE BASICS: CONSTRUCTOR - OPERATOR 'NEW' TASKS
 * This code below has been copied from w1d3_part1.js homework file
 *****************************************************************/

/** Two Functions - One Object 
 * Is it possible to create functions A and B such as new A() == new B() ?
      function A() { ... }
      function B() { ... }

      let a = new A;
      let b = new B;

      alert(a == b); // true
 * If it is, then provide an example of their code.*/

function twoFunctionsOneObject() {
  function A() {
    this.name = "sophia";
  }
  
  function B() {
    this.name = "sophia";
  }
  let a = new A;
  let b = new B;

  alert(a == b); // false

  /* Solution requires returning an object other than this and 
  that object must be in an external environment or passed in as a parameter 
  (the latter of which would defy the constraints of the question.)*/
  let thing = { name: 'thingy' };
  function C() { return thing }
  function D() { return thing }
  let c = new C;
  let d = new D;

  alert(c == d); // true
}

/** Create new Calculator
 * Create a constructor function Calculator that creates objects with 3 methods:
      read() asks for two values using prompt and remembers them in object properties.
      sum() returns the sum of these properties.
      mul() returns the multiplication product of these properties.
 * For instance:
      let calculator = new Calculator();
      calculator.read();

      alert( "Sum=" + calculator.sum() );
      alert( "Mul=" + calculator.mul() ); 
    */

function createNewCalculator() {
  // my code
  function Calculator() {
    this.read = function () {
      this.a = +prompt("enter a number: ", 0);
      this.b = +prompt("enter another number: ", 0);
    };
    this.sum = function () {
      return this.a + this.b;
    };
    this.mul = function () {
      return this.a * this.b;
    };
  }

  // given code
  let calculator = new Calculator();
  alert("You've created a calculator. It will ask you for two values.");
  calculator.read();

  alert("Sum=" + calculator.sum());
  alert("Mul=" + calculator.mul());
}

/** Create new Accumulator
 * Create a constructor function Accumulator(startingValue).
 * Object that it creates should:
 *    Store the “current value” in the property value. The starting value is set to the argument of the constructor startingValue.
 *    The read() method should use prompt to read a new number and add it to value.
 * In other words, the value property is the sum of all user-entered values with the initial value startingValue.

Here’s the demo of the code:
*/
function createNewAccumulator() {
  // my code

  function Accumulator(initialValue) {
    this.value = initialValue;
    this.read = function () {
      this.value += +prompt("Enter a new number:", 0);
    };
  }

  // given code
  let accumulator = new Accumulator(1); // initial value 1
  alert("You've created an accumulator. 'read()' will be called twice.");
  accumulator.read(); // adds the user-entered value
  accumulator.read(); // adds the user-entered value

  alert(`The sum of your inputs is: ${accumulator.value}`); // shows the sum of these values */
}