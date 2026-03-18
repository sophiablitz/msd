"use strict";
/*******************************
 * METHODS of PRIMITIVES
 *******************************/
/**
Can I add a string property ?
Consider the following code:

How do you think, will it work ? What will be shown ?
  in strict mode, an error occurs.

  the string object created and used to wrap 
  the string value "Hello" is discarded after use and 
  is not available when referenced in str.test.
 */
function canIAddAStringProperty() {

  let str = "Hello";

  str.test = 5;

  alert(str.test);
}

/*******************************
 * NUMBERS
 *******************************/
/**
Sum numbers from the visitor
Create a script that prompts the visitor to enter two numbers and then shows their sum.

Run the demo

P.S.There is a gotcha with types.
  */
function sumNumbersFromTheVisitor() {
  let num1 = +prompt("enter a number");
  let num2 = +prompt("enter a number");
  alert(num1 + num2);
}

/**
Why 6.35.toFixed(1) == 6.3 ?
According to the documentation Math.round and toFixed both round to the nearest number: 0..4 lead down while 5..9 lead up.

For instance:
  alert(1.35.toFixed(1)); // 1.4
In the similar example below, why is 6.35 rounded to 6.3, not 6.4 ?
  alert(6.35.toFixed(1)); // 6.3

How to round 6.35 the right way ?
Multiply by powers of ten to make the number either an integer or another number representable exactly in binary.
*/


/**Repeat until the input is a number
Create a function readNumber which prompts for a number until the visitor enters a valid numeric value.

The resulting value must be returned as a number.
The visitor can also stop the process by entering an empty line or pressing “CANCEL”.In that case, the function should return null.
*/

function readNumber() {
  let input;
  while (true) {
    input = prompt("Enter a number");
    if ((input === null) || (input == "")) {
      return null;
    } else if (isFinite(+input)) {
      return +input;
    }
  }
}

/**
An occasional infinite loop
This loop is infinite.It never ends.Why ?

    let i = 0;
    while (i != 10) {
      i += 0.2;
    }
  0.2 is not an exact value in internal binary representation and therefor 
  rounding errors cuase the sum of the increments to never result in an exact 10.
*/


/**A random number from min to max
The built -in function Math.random() creates a random value from 0 to 1(not including 1).

Write the function random(min, max) to generate a random floating - point number from min to max(not including max).
*/
function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
A random integer from min to max
Create a function randomInteger(min, max) that generates a random integer number 
from min to max including both min and max as possible values.

Any number from the interval min..max must appear with the same probability.
*/
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

/******************************
 *  STRINGS
 ******************************/

/* Uppercase the first character
Write a function ucFirst(str) that returns the string str with the uppercased first character, for instance:

  ucFirst("john") == "John"; */
function ucFirst(str) {
  if (str.length == 0) return str;
  return str[0].toUpperCase() + str.substring(1);
}

/* Check for spam
Write a function checkSpam(str) that returns true if str contains ‘viagra’ or ‘XXX’, otherwise false.

The function must be case -insensitive:
  checkSpam('buy ViAgRA now') == true
  checkSpam('free xxxxx') == true
  checkSpam("innocent rabbit") == false */
function checkSpam(str) {
  str = str.toLowerCase();
  return (str.indexOf("viagra") != -1 || str.indexOf("xxx") != -1)
}

/* Truncate the text
Create a function truncate(str, maxlength) that checks the length of the str and, 
if it exceeds maxlength – replaces the end of str with the ellipsis character "…", 
to make its length equal to maxlength.

The result of the function should be the truncated(if needed) string.
For instance:
    truncate("What I'd like to tell on this topic is:", 20) = "What I'd like to te…"
    truncate("Hi everyone!", 20) = "Hi everyone!" */
function truncate(str, maxlength) {
  if (str.length > maxlength) {
    str = str.substr(0, maxlength - 1) + "…";
  }
  return str;
}


/* Extract the money
We have a cost in the form "$120".That is: 
the dollar sign goes first, and then the number.

Create a function extractCurrencyValue(str) 
that would extract the numeric value from such string and return it.

The example:
  alert(extractCurrencyValue('$120') === 120); // true */
function extractCurrencyValue(str) {
  return +(str.substring(1));
}


/******************************
 *  ARRAYS
 ******************************/
/** Maximal Sub Array */
/**
 * Determine the max sum of any subarray within a given array
 *
 * @param {array} arr an array of numbers
 * @returns {number} the max sum of any subarray of the input
 */
function getMaxSubSum(arr) {

  let previousSum = 0;
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    previousSum += arr[i];
    if (previousSum < 0) {
      previousSum = 0;
    }
    max = Math.max(previousSum, max);
  }
  return max;

}

/******************************
 *  ARRAY METHODS
 ******************************/

/* Translate border - left - width to borderLeftWidth
Write the function camelize(str) that changes dash-separated words 
like “my-short-string” into camel-cased “myShortString”.

That is: removes all dashes, each word after dash becomes uppercased.
  Examples:
    camelize("background-color") == 'backgroundColor';
    camelize("list-style-image") == 'listStyleImage';
    camelize("-webkit-transition") == 'WebkitTransition';
P.S.Hint: use split to split the string into an array, transform it and join back.
 */
function camelize(str) {
  let words = str.split("-");
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }
  return words.join("");
}




/* Filter range
Write a function filterRange(arr, a, b) that gets an array arr, 
looks for elements between a and b in it and returns an array of them.

The function should not modify the array. 
It should return the new array.

For instance:

    let arr = [5, 3, 8, 1];
    let filtered = filterRange(arr, 1, 4);
    alert(filtered); // 3,1 (matching values)
    alert(arr); // 5,3,8,1 (not modified)
 */
/**
 * Gets an array arr, looks for elements between a and b in it 
 * and returns an array of value between a and b
 *
 * @param {Array} arr Array of numbers
 * @param {number} a Min acceptable value
 * @param {number} b Max acceptable value
 * @returns {Array} Array of numbers between a and b
 */
function filterRange(arr, a, b) {
  let output = arr.filter(val => { return val >= a && val <= b });
  return output;
}




/* Filter range "in place"
Write a function filterRangeInPlace(arr, a, b) that gets an array arr and removes from it all values except those that are between a and b.The test is: a ≤ arr[i]≤ b.

The function should only modify the array.It should not return anything.

For instance:

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4

alert(arr); // [3, 1] */
/**
 * Gets an array arr and removes from it all values except those that are between a and b.
 * The array is modified and nothing else is returned.
 * @param {Array} arr Array of numbers modified to only include numbers in inclusive range a to b.
 * @param {number} a Min acceptable value
 * @param {number} b Max acceptable value
 */
function filterRangeInPlace(arr, a, b) {

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < a || arr[i] > b) {
      arr.splice(i, 1);
      i--;
    }
  }
}




/* Sort in the reverse order
let arr = [5, 2, 1, -10, 8];
// ... your code to sort it in the reverse order
alert(arr); // 8, 5, 2, 1, -10 */

/**
 * Sort array in descending order
 *
 * @param {array} arr array of numbers to be sorted
 */
function sortReverse(arr) {
  arr.sort((a, b) => b - a)
}



/* Copy and sort array
We have an array of strings arr.
We’d like to have a sorted copy of it, but keep arr unmodified.
Create a function copySorted(arr) that returns such a copy.

  let arr = ["HTML", "JavaScript", "CSS"];
  let sorted = copySorted(arr);
  alert(sorted); // CSS, HTML, JavaScript
  alert(arr); // HTML, JavaScript, CSS (no changes) */

/**
 * Create and sort a copy of an array of strings
 *
 * @param {Array} arr array of strings
 * @returns {Array} new array of sorted strings alphabetically
 */
function copySorted(arr) {
  let copy = arr.slice(0);
  return copy.sort();
}


/* Create an extendable calculator
Create a constructor function Calculator that creates “extendable” calculator objects.

The task consists of two parts.

  First, implement the method calculate(str) that takes a string 
  like "1 + 2" in the format “NUMBER operator NUMBER” (space-delimited) and 
  returns the result. Should understand plus + and minus -.

Usage example:
    let calc = new Calculator;
    alert(calc.calculate("3 + 7")); // 10

Then add the method addMethod(name, func) that teaches the calculator a new operation.
It takes the operator name and the two - argument function func(a, b) that implements it.

For instance, let’s add the multiplication *, division / and power **:

    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert(result); // 8
No parentheses or complex expressions in this task.
The numbers and the operator are delimited with exactly one space.
There may be error handling if you’d like to add it.
Open a sandbox with tests. */
/**
 * Calculator object with method for extensions
 */
function Calculator() {
  this.operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b
  };
  /** 
   * Evaluate or calculate the value of an expression
   * @param {string} expression a string to evaluate in the form of "number operator number"
   * @returns {number} the value of the expression
   */
  this.calculate = (expression) => {
    let parts = expression.split(" ");

    let a = +parts[0];
    let b = +parts[2];
    let key = parts[1];

    return this.operations[key](a, b);
  };
  /**
   * Add a new operator to the calculator
   * @param {string} name an operator name to be added
   * @param {function} func how to calculate using the new operator given two operands
   */
  this.addMethod = (name, func) => {
    this.operations[name] = func;
  }
}




/* Map to names
You have an array of user objects, each one has user.name.
Write the code that converts it into an array of names.

For instance:

  let john = { name: "John", age: 25 };
  let pete = { name: "Pete", age: 30 };
  let mary = { name: "Mary", age: 28 };

  let users = [john, pete, mary];
  let names = //... your code
  alert(names); // John, Pete, Mary */

/**
 * Create a list of names of people given an array of people with property 'name'
 *
 * @param {Array} users Array of objects with property 'name'
 * @returns {Array} Array of names of all users
 */
function makeArrayOfNames(users) {
  let names = [];
  users.forEach((person) => { names.push(person.name) });
  return names;
}




/* Map to objects
You have an array of user objects, each one has name, surname and id.

Write the code to create another array from it, of objects with id and fullName, 
where fullName is generated from name and surname.

For instance:

    let john = { name: "John", surname: "Smith", id: 1 };
    let pete = { name: "Pete", surname: "Hunt", id: 2 };
    let mary = { name: "Mary", surname: "Key", id: 3 };

    let users = [john, pete, mary];
    let usersMapped = // ... your code ...

  // usersMapped = [
  //   { fullName: "John Smith", id: 1 },
  //   { fullName: "Pete Hunt", id: 2 },
  //   { fullName: "Mary Key", id: 3 }
  // ]

  alert(usersMapped[0].id) // 1
  alert(usersMapped[0].fullName) // John Smith

So, actually you need to map one array of objects to another.Try using => here. There’s a small catch.

 */
/**
 * Create an array of users with property 'fullName' made from 
 * an array of users with properties 'name' and 'surname'.
 * New uesrs must also keep their ids in property 'id'
 *
 * @param {Array} users Array of users with proper
 * @returns {Array} Array of users with properties 'fullName' and 'id'
 */
function mapUsers(users) {
  let newUsers = [];
  users.forEach((person) => {
    newUsers.push({
      fullName: person.name + " " + person.surname,
      id: person.id
    })
  });
  return newUsers;
}




/*
Sort users by age
Write the function sortByAge(users) that gets an array of objects with the age property and sorts them by age.

For instance:
    let john = { name: "John", age: 25 };
    let pete = { name: "Pete", age: 30 };
    let mary = { name: "Mary", age: 28 };

    let arr = [pete, john, mary];

    sortByAge(arr);

    // now: [john, mary, pete]
    alert(arr[0].name); // John
    alert(arr[1].name); // Mary
    alert(arr[2].name); // Pete */
/**
 * Modify an arry by sorting it according to each element's 'age' property
 *
 * @param {Array} arr Array of objects with property 'age'
 */
function sortByAge(arr) {
  arr.sort((a, b) => a.age - b.age);
}


/* Shuffle an array
Write the function shuffle(array) that shuffles(randomly reorders) elements of the array.
Multiple runs of shuffle may lead to different orders of elements.For instance:

  let arr = [1, 2, 3];
  shuffle(arr);
  // arr = [3, 2, 1]
  shuffle(arr);
  // arr = [2, 1, 3]
  shuffle(arr);
  // arr = [3, 1, 2]

All element orders should have an equal probability. For instance, [1, 2, 3] 
can be reordered as [1, 2, 3] or [1, 3, 2] or [3, 1, 2] etc, with equal probability of each case.
 */
/**
 * Shuffles (randomly reorders) elements of an array.
 * @param {Array} arr Array of numbers to be reordered.
 */
function shuffle(arr) {
  let output = [];
  while (arr.length > 0) {
    let randomSpot = Math.floor(Math.random() * arr.length);
    output.push(arr[randomSpot]);
    arr.splice(randomSpot, 1);
  }
  for (let i = 0; i < output.length; i++) {
    arr.push(output[i]);
  }
}






/* Get average age
Write the function getAverageAge(users) that gets an array of 
objects with property age and returns the average age.
The formula for the average is(age1 + age2 + ... + ageN) / N.
For instance:
  let john = { name: "John", age: 25 };
  let pete = { name: "Pete", age: 30 };
  let mary = { name: "Mary", age: 29 };

  let arr = [john, pete, mary];
  alert(getAverageAge(arr)); // (25 + 30 + 29) / 3 = 28
 */

/**
 * Calculate average age of users in array
 *
 * @param {Array} users Array of users with property 'age'
 * @returns {number} The average age of all objects in array users
 */
function getAverageAge(users) {
  let sum = users.reduce((out, val) => out += val.age, 0);
  return sum / users.length;
}




/* Filter unique array members
Let arr be an array. Create a function unique(arr) 
that should return an array with unique items of arr.

For instance:
    let strings = ["Hare", "Krishna", "Hare", "Krishna",
      "Krishna", "Krishna", "Hare", "Hare", ":-O"
    ];

    alert(unique(strings)); // Hare, Krishna, :-O */

function unique(arr) {
  let unique = [];
  for (let i = 0; i < arr.length; i++) {
    // determine if the element arr[i] exists in the unique array
    let indexFound = unique.findIndex(el => el == arr[i]);

    if (indexFound == -1) {
      unique.push(arr[i]);
    }
  }
  return unique;

}