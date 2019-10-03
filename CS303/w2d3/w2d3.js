"use strict";
/* Are counters independent ?
Here we make two counters: counter and counter2 
using the same makeCounter function.

Are they independent? yes. The counter variable created in the lexical environment 
of the counter function  is unique to each counter function

What is the second counter going to show ? 0, 1 or 2, 3 or something else?
The second counter will show 0,1
 */
function runAreCountersIndependent() {
  console.log("Begin: Are counters independent?");


  let counterA = makeCounter();
  let counterB = makeCounter();

  console.log(counterA()); // 0
  console.log(counterA()); // 1

  console.log(counterB()); // 0
  console.log(counterB()); // 1
}
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}



/* Counter object
Here a counter object is made with the help of the constructor function.

Will it work ? 
Yes, the counter variable is in the lexical environment of both up and down functions
and there for is referenced by both functions
What will it show ? 
1,2,1

*/
function runCounterObject() {
  console.log("Begin: Counter Object");
  let counter = new Counter();

  console.log(counter.up()); //  1
  console.log(counter.up()); // 2
  console.log(counter.down()); // 1
}
function Counter() {
  let count = 0;

  this.up = function () {
    return ++count;
  };
  this.down = function () {
    return --count;
  };
}
/* Function in if
Look at the code.What will be the result of the call at the last line ?

sayHi will throw an error as it is referencing a function not defined in that lexical environment
 */

function runFunctionInIf() {
  console.log("Begin: Function in if");
  let phrase = "Hello";

  if (true) {
    let user = "John";

    function sayHi() {
      console.log(`${phrase}, ${user}`);
    }
  }
  sayHi();
}


/* Sum with closures
Write function sum that works like this: sum(a)(b) = a + b.
  Yes, exactly this way, using double parentheses(not a mistype).

  For instance: */
function runSumWithClosures() {
  console.log(sum(1)(2)); // 3
  console.log(sum(5)(-1)); // 4
}
function sum(num) {
  return function (b) {
    return b + num;
  }
}


/* Filter through function
We have a built-in method arr.filter(f) for arrays.
It filters all elements through the function f.
If it returns true, then that element is returned in the resulting array.

Make a set of “ready to use” filters:

inBetween(a, b) – between a and b or equal to them(inclusively).
inArray([...]) – in the given array.

The usage must be like this: 

    arr.filter(inBetween(3, 6));// – selects only values between 3 and 6.
    arr.filter(inArray([1, 2, 3]));// – selects only elements matching with one of the members of[1, 2, 3].
For instance:
    // .. your code for inBetween and inArray 
    let arr = [1, 2, 3, 4, 5, 6, 7];

    console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6
    console.log(arr.filter(inArray([1, 2, 10]))); // 1,2 */
function runFilterThroughFunction() {
  let arr = [1, 2, 3, 4, 5, 6, 7];

  console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6
  console.log(arr.filter(inArray([1, 2, 10]))); // 1,2 

}
function inBetween(a, b) {
  return (val) => val >= a && val <= b;
}
function inArray(array) {
  return (val) => array.includes(val);
}



/** Sort by field
 * We’ve got an array of objects to sort: 
 * The usual way to do that would be:
 *   users.sort((a, b) => a.name > b.name ? 1 : -1)
 *   users.sort((a, b) => a.age > b.age ? 1 : -1)
 * Can we make it even less verbose, like this
 *   users.sort(byField('name'))
 *   users.sort(byField('age'))
 *
 * So, instead of writing a function, just put byField(fieldName).
 * Write the function byField that can be used for that.
 */
function runSortByField() {
  let users = [
    { name: "John", age: 20, surname: "Johnson" },
    { name: "Pete", age: 18, surname: "Peterson" },
    { name: "Ann", age: 19, surname: "Hathaway" }
  ];
  console.log(users);
  let result;

  console.log("***By name:***");
  result = users.sort((a, b) => a.name > b.name ? 1 : -1); // by name (Ann, John, Pete)
  result.forEach(val=>{console.log(val.name + " " + val.age)});

  console.log("***By age:***");
  result = users.sort((a, b) => a.age > b.age ? 1 : -1); // by age (Pete, Ann, John)
  result.forEach(val => { console.log(val.name + " " + val.age) });

  console.log("***By name:***");
  result = users.sort(byField('name'));
  result.forEach(val => { console.log(val.name + " " + val.age) });

  console.log("***By age:***");
  result = users.sort(byField('age'));
  result.forEach(val => { console.log(val.name + " " + val.age) });
}
function byField(fieldName) {
  return (a, b) => { return a[fieldName] > b[fieldName] ? 1 : -1 };
}


/* 
Army of functions
The following code creates an array of shooters.

Every function is meant to output its number. 
But something is wrong…

Why do all shooters show the same ? 
all functions have the same lexical environment and share the same variable.

Fix the code so that they work as intended.
I rewrite the creation of shooter functions to be in a function itself, 
creating a unique lexical environment for each created shooter function.
*/
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = makeShooter(i);
    shooters.push(shooter);
    i++;
  }

  return shooters;
}
function makeShooter(n){
  return ()=>{console.log(n)};
}
function runArmyOfFunctions() {

  let army = makeArmy();

  army[0](); // the shooter number 0 shows 10
  army[5](); // and number 5 also outputs 10...
  // ... all shooters show 10 instead of their 0, 1, 2, 3...
}
