"use strict";
/*eslint-disable*/
/**************************
 * NATIVE PROTOTYPE
 **************************/

/* Add method "f.defer(ms)" to functions
Add to the prototype of all functions the method defer(ms), 
that runs the function after ms milliseconds.

After you do it, such code should work: */
function runAddMethodDefer() {

  Function.prototype.defer = function (delay) {
    setTimeout(this, delay);
  };
  function f() {
    alert("Hello!");
  }
  f.defer(2000); // shows "Hello!" after 1 second
}


/* Add the decorating "defer()" to functions
Add to the prototype of all functions the method defer(ms), that returns a wrapper, delaying the call by ms milliseconds.

  Here’s an example of how it should work: */
function runAddDecoratingDeferToFunctions() {
  Function.prototype.defer = function (ms){
    let f = this;
    return function (...args){ 
      setTimeout( ()=>f.apply(this, args), ms) 
    }
  };
  function f(a, b) {
    alert(a + b);
  }

  f.defer(1000)(1, 2); // shows 3 after 1 second
}
// Please note that the arguments should be passed to the original function.
