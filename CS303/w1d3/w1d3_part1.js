"use strict";
/**
 * Slides: https://online.cs.mum.edu/access/content/group/f36f088a-b353-4765-bb36-1fd3d8656940/lectures/w1d3Objects.pdf
 * 
 * Exercises: https://javascript.info/object#tasks
 *   Hello object
 *   Check for emptiness
 *   Constant objects?
 *   Sum object properties
 *   Multiply numeric properties by 2
 * 
 * Exercises: https://javascript.info/object-methods#tasks
 *   Syntax check
 *   Explain the value of "this“
 *   Create a calculator exercise in VSCode
 *     create a Mocha test and run it in VSCode
 *     you can view the solution in the book and then have it run in VSCode
 *       You do not need to use the sinon.stub and prompt.onCall methods
 *       But ok to use them if you like
 *       Or explicitly set the fields in the test
 *   Chaining
 *
 * Exercises: https://javascript.info/constructor-new#tasks
 *   Two functions – one object
 *   Create new Calculator
 *   Create new Accumulator
 */


/** Hello Object */
function helloObject() {
  // Create an empty object user.
  let user = {};
  console.log(user);

  // Add the property name with the value John.
  user.name = "John";
  console.log(user);

  // Add the property surname with the value Smith.
  user.surname = "Smith";
  console.log(user);

  // Change the value of the name to Pete.
  user.name = "Pete";
  console.log(user);

  // Remove the property name from the object.
  delete user.name;
  console.log(user);

  /** solution
    let user = {};
    user.name = "John";
    user.surname = "Smith";
    user.name = "Pete";
    delete user.name;
   */
}


/** Check for Emptiness 
 * Write the function isEmpty(obj) which returns true if the object has no properties, false otherwise. 
 * Should work like that:
 *    let schedule = {};
 *    alert( isEmpty(schedule) ); // true
 *    schedule["8:30"] = "get up";
 *    alert( isEmpty(schedule) ); // false
*/
function checkForEmptiness() {
  let schedule = {};
  alert("Schedule is empty: " + isEmpty(schedule)); // true
  schedule["8:30"] = "get up";
  alert("Schedule is empty: " + isEmpty(schedule)); // false
  /**
   * Determines if an object is empty / has no properties
   *
   * @param {object} obj an object
   * @returns {boolean} true if object has no properties, else false
   */
  function isEmpty(obj) {
    let count = 0;
    for (let key in obj) {
      count++;
    }
    return !(count > 0);
  }
}
/** Constant Objects
 * Is it possible to change an object declared with const?What do you think ?
 */
function constantobjects() {
  const user = {
    name: "John"
  };

  console.log(user.name);

  // does it work? // yes
  user.name = "Pete";
  console.log(user.name);
}

/** Sum Object Properties 
 * Write the code to sum all salaries and store in the variable sum. Should be 390 in the example above.
 * If salaries is empty, then the result must be 0.
*/
function sumObjectProperties() {
  //We have an object storing salaries of our team:
  let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
  }
  console.log("Sum of salaries: " + sumSalaries(salaries));

  /**
   * Determine sum of salaries of all persons in object salary
   *
   * @param {object} sal object with all properties holding salaries
   * @returns {number} the sum of all salaries of all persons
   */
  function sumSalaries(sal) {
    let sum = 0;
    for (let key in sal) {
      sum += sal[key];
    }
    return sum;
  }
}

/** Multiply numeric properties by 2
 * Create a function multiplyNumeric(obj) that multiplies all numeric properties of obj by 2.
 * 
 */
function multiplyNumericPropertiesBy2() {
  // before the call
  let menu = {
    width: 200,
    height: 300,
    title: "My menu"
  };
  console.log(menu);

  multiplyNumeric(menu);

  // after the call
  console.log(menu);
  // menu = {
  //   width: 400,
  //   height: 600,
  //   title: "My menu"
  // };

  function multiplyNumeric(obj) {
    for (let key in obj) {
      if (isNumeric(obj[key])) {
        obj[key] = parseFloat(obj[key]) * 2;
      }
    }
  }

  function isNumeric(value) {
    return !isNaN(parseFloat(value));
  }
}

/** Syntax Check 
 * What is the result of this code?
*/
function syntaxCheck() {
  let user = {
    name: "John",
    go: function () { console.log("before"); alert(this.name); console.log("after"); }
  }

    (user.go)()
  // What is the result? A reference error occurs because the parenthesis around user.go act as a 
  // function call being invoked at the end of the object defined above it (becuase that object definition 
  // doesn't have a terminating semicolon). If you add a semicolon to the end of the user object definition, 
  // all behave as expected. Parenthesis directly around object.method do not affect the call of that function.
  // however the strange case of the || operator does affect the passing of the 'this' reference across the 
  // dot operator and through to the invoking of a function call.
}
/** Explain The Value of This
 * In the code below we intend to call user.go() method 4 times in a row.
 * But calls (1) and (2) works differently from (3) and (4). Why?
 */
function explainTheValueOfThis() {
  let obj, method;

  obj = {
    go: function () { alert(this); console.log(this); }
  };

  obj.go();               // (1) [object Object] // 'this' points to the object obj

  (obj.go)();             // (2) [object Object] // 'this' points to the object obj

  (method = obj.go)();    // (3) undefined // If 'use strict', 'this' is undefined. If not 'use strict' 'this' points to the global object (window)

  (obj.go || obj.stop)(); // (4) undefined // If 'use strict', 'this' is undefined. If not 'use strict' 'this' points to the global object (window)
}


/** Using "this" in object literal
 * Here the function makeUser returns an object.
 * What is the result of accessing its ref ? Why ?
 */
function usingThisInObjectLiteral() {
  function makeUser() {
    return {
      name: "John",
      ref: this
    };
  };

  let user = makeUser();

  alert(user.ref.name);
  // What's the result of the above code? 
  // Error because the value of this is determined at time of call. 
  // If however you were to return this from a function in ref, it would be assigned the time of the call to the 
  // method from the object and hold the ref to the oject as 'expected'.

  function makeAlternativeUser() {
    return {
      name: "John",
      ref: function () { return this; }
    };
  };
  let altUser = makeAlternativeUser();

  alert(altUser.ref().name);
}


/** Create a Calculator
 * Create an object calculator with three methods:
 *    read() prompts for two values and saves them as object properties.
 *    sum() returns the sum of saved values.
 *    mul() multiplies saved values and returns the result.
*/

function createACalculator() {
  let calculator = {
    read() {
      this.num1 = +prompt("enter a number");
      this.num2 = +prompt("enter a number");
    },
    sum() {
      return this.num1 + this.num2;
    },
    mul() {
      return this.num1 * this.num2;
    }
  }

  calculator.read();
  console.log(calculator.sum());
  console.log(calculator.mul());
}

/** Chaining
 * There’s a ladder object that allows to go up and down:
    let ladder = {
      step: 0,
      up() {
        this.step++;
      },
      down() {
        this.step--;
      },
      showStep: function() { // shows the current step
        alert( this.step );
      }
    };
 * Now, if we need to make several calls in sequence, can do it like this:

    ladder.up();
    ladder.up();
    ladder.down();
    ladder.showStep(); // 1
 * Modify the code of up, down and showStep to make the calls chainable, like this:
    ladder.up().up().down().showStep(); // 1 */
function chaining() {
  let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep: function () { // shows the current step
      alert(this.step);
      return this;
    }
  };
  ladder.up().up().down().showStep(); // 1 */
}

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
  function C() { return thing };
  function D() { return thing };
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
  };

  // given code
  let calculator = new Calculator();
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
    }
  }

  // given code
  let accumulator = new Accumulator(1); // initial value 1

  accumulator.read(); // adds the user-entered value
  accumulator.read(); // adds the user-entered value

  alert(accumulator.value); // shows the sum of these values */
}