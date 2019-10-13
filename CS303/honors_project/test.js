"use strict";
/* global Egg*/
let egg = new Egg("output");

/*********************
 * TESTS FOR MY CODE *
 *********************/
function runspecialFormsSetTest() {

  egg.run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);
  // → 50
  run(`set(quux, true)`);
  // → Some kind of ReferenceError
}
function runArraysTest() {
  egg.run(`
do(define(myArray,array(1,2,3)),
   define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(myArray)))
`);
  // → 6
}
function runCommentsInArraysTest() {
  egg.run(`
  #this should be okay
do(define(myArray,array(1,2,3)),
   define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(myArray)))`);
  // → 6
}
function runAllMyCodeTests() {
  console.log("*****************************");
  console.log("Special Forms 'set' test should output 50, then reference error");
  runspecialFormsSetTest();
  console.log("*****************************");
  console.log("Arrays test should output 6");
  runArraysTest();
}
/*******************
 * LANGUAGE TESTS  *
 *******************/
function runClosureTest() {
  egg.run(`
do(define(f, fun(a, fun(b, +(a, b)))),
   print(f(4)(5)))
`);
  // → 9
}
function runFunctionsTest() {
  egg.run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`);
  // → 11

  egg.run(`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
`);
  // → 1024
}
function runScopeTest() {
  egg.run(`
do(define(total, 0),
   define(count, 1),
   while(<(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1)))),
   print(total))
`);
  // → 55
}
function runParseTest() {
  console.log(egg.parse("+(a, 10)"));
  // → {type: "apply",
  //    operator: {type: "word", name: "+"},
  //    args: [{type: "word", name: "a"},
  //           {type: "value", value: 10}]}
}
function runAllLanguageTests() {
  console.log("*****************************");
  console.log("Closure test should output 9");
  runClosureTest();
  console.log("*****************************");
  console.log("Functions test should output 11, then 1024");
  runFunctionsTest();
  console.log("*****************************");
  console.log("Scope test should output 55");
  runScopeTest();
  console.log("*****************************");
  console.log("Parse test should output ");
  console.log(`{type: "apply",
    operator: {type: "word", name: "+"},
    args: [{type: "word", name: "a"},
           {type: "value", value: 10}]}`);
  runParseTest();

}