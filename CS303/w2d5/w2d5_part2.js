"use strict";
/**************************
 * Timeout Exercises
 ************************ */

/* Output every second
Write a function printNumbers(from, to) that outputs a number every second, 
starting from 'from' and ending with 'to'.
Make two variants of the solution, one using setInterval, one using nested setTimeout. */

/**
 * Print to console all intgers between 'from' and 'to'
 * @param {number} from starting integer to count from. Must be less than to.
 * @param {number} to ending integer to count to. Must be greater than from.
 * @returns {undefined}
 */
function printNumbersWithSetInterval(from, to) {
  if (from > to) {
    return;
  }
  // eslint-disable-next-line id-length
  let id = setInterval(() => {
    checkInterval();
    console.log(from++);
  }, 1000);

  // eslint-disable-next-line require-jsdoc
  function checkInterval() {
    if (!(from < to)) {
      clearInterval(id);
    }
  }
}

/**
 * Print to console all intgers between 'from' and 'to'
 * @param {number} from starting integer to count from. Must be less than to.
 * @param {number} to ending integer to count to. Must be greater than from.
 * @returns {undefined}
 */
function printNumbersWithSetTimeout(from, to) {
  setTimeout(function count() {
    console.log(from++);
    if (from <= to) {
      setTimeout(count, 1000);
    }
  }, 1000);
}

/**
 * Helper function to test exercise
 * @returns {undefined}
 */
function runOutputEverySecondWithSetInterval() {
  console.log("Print numbers from 1 to 4");
  printNumbersWithSetInterval(1, 4);
}

/**
 * Helper function to test exercise
 * @returns {undefined}
 */
function runOutputEverySecondWithSetTimeout() {
  console.log("Print numbers from 1 to 4");
  printNumbersWithSetTimeout(1, 4);
}



/* What will setTimeout show ?
In the code below there’s a setTimeout call scheduled, 
then a heavy calculation is run, that takes more than 100ms to finish.

When will the scheduled function run?
  ***After the loop.***

What is alert going to show ? // 100000000

  let i = 0;

  setTimeout(() => alert(i), 100); // ?

  // assume that the time to execute this function is >100ms
  for (let j = 0; j < 100000000; j++) {
    i++;
  } */

/**
 * Helper function to test exercise
 * @returns {undefined}
 */
function runWhatWillSetTimeoutShow() {
  let i = 0;

  setTimeout(() => alert(i), 100); // ?

  // assume that the time to execute this function is >100ms
  for (let j = 0; j < 100000000; j++) {
    i++;
  }
}

/**
 * Determines the nth element of the Fibonacci sequence
 *
 * @param {Number} n positive integer 
 * @returns {number} The nth number of Fibonacci sequence
 */
function fibonacci(n) {
  let array = [1, 1];
  // eslint-disable-next-line require-jsdoc
  let fib = function (n) {
    if (n > array.length) {
      // console.log(array[array.length - 1]);
      array.push(array[array.length - 1] + array[array.length - 2]);
      return fib(n);
    }
    return array[n-1];
  };
  return fib(n);
}
