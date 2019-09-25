/** 
 * Slides: https://online.cs.mum.edu/access/content/group/f36f088a-b353-4765-bb36-1fd3d8656940/lectures/w1d1functionsAndArraysReview.pdf
 * Exercise: https://javascript.info/function-expressions-arrows#tasks
 *   Rewrite with arrow functions
 * Exercises https://javascript.info/array#tasks
 *   Is array copied?
 *   Array operations
 *   Calling in an array context
 *   Sum input numbers
 *   A maximal subarray 
 */


/* ***************************************
 * Functions
 * ************************************** */

// Rewrite the function using '?'
function checkAge1(age) {
  return age > 18 ? true : confirm('Did parents allow you?');
}

// Rewrite the function using '||'
function checkAge2age(age) {
  return age > 18 || confirm('Did parents allow you?');
}

// Write a function min(a,b) which returns the least of two numbers a and b
function min(a, b) {
  return a < b ? a : b;
}

// Write a function pow(x,n) which returns x to the power of n
// Works with all integer values of n
function pow(x, n) {
  let out = 1;
  for (let i = 0; i < Math.abs(parseInt(n)); i++) {
    out *= x;
  }
  return n < 0 ? 1 / out : out;
}
// Helper function to test if pow() works as Math.pow works
function testPow(x, n) {
  return pow(x, n) == Math.pow(x, n);
}

/* ***************************************
 * Function Expressions and Arrows
 * ***************************************/
function ask(q, y, n) {
  if (confirm(q)) y()
  else n();
}
function testAsk() {
  // Call ask with arrow functions
  ask(
    "Do you agree?",
    () => alert("You agreed."),
    () => alert("You canceled the execution.")
  );
}

/* ***************************************
 * Data Types: Arrays
 * ***************************************/

function isArrayCopied() {
  let fruits = ["Apples", "Pear", "Orange"];

  // push a new value into the "copy"
  let shoppingCart = fruits;
  shoppingCart.push("Banana");

  // what's in fruits?
  alert(fruits.length); // 4
}
/** arrayOperations()
 * Creates array and modifies it
 *  - pushes an element
 *  - rep laces an element
 *  - shifts the array
 *  - unshifts the array
 */
function arrayOperations() {
  let styles = ["Jazz", "Blues"];
  console.log(styles);
  styles.push("Rock-n-Roll");
  console.log(styles);

  let replaceMiddle = (arr) => {
    arr[Math.floor(arr.length / 2)] = "Classics";
  };
  replaceMiddle(styles);
  console.log(styles);
  alert(styles.shift());
  console.log(styles);
  styles.unshift("Rap", "Reggae");
  console.log(styles);
}
/** callingInAnArrayContext()
 * Illustrates textbook example of using this in a function in an array
 */
function callingInAnArrayContext() {
  let arr = ["a", "b"];

  arr.push(function () {
    alert(this);
  })

  arr[2](); // array object: "a,b,function..."
}
/** sumInput()
 * prompts user for numbers until blank/cancel
 * @returns {number} (sum of numbers entered by user)
 */
function sumInput() {
  let input = 0;
  let arr = [];
  input = prompt("Enter a number to add to the sum:");
  console.log(input);
  while (!(isNaN(parseFloat(input)))) {
    arr.push(input);
    input = prompt("Enter a number to add to the sum:");
    console.log(input);
  }
  return arr.reduce((out, val) => out += parseFloat(val), 0);
}
/** getMaxSubSumFirstAttempt(arr)
 * First attempt at algorithm
 * Limitation: does not find max sum when sub array spans 
 * across a negative value
 * @param {Array} arr (Array of numbers)
 * @returns {number} (Maximum sum of a sub array from the input array)
 */
function getMaxSubSumFirstAttempt(arr) {
  let sum = 0;
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {

      // console.log("sum: " + sum + " goes to 0.");
      sum = 0;
    } else {
      sum += arr[i];
      if (sum > max) {
        max = sum;
        // console.log("max: " + max);
      }
      // console.log("sum: " + sum);
    }
  }
  console.log(max);
  return max;
}

/** condenseArray(arr)
 * Helper function for getMaxSubSum
 * Combines any consecutive positive or consecutive negative array items by adding them
 * @param {Array} arr (Array of numbers to be condensed)
 */
function condenseArray(arr) {
  // condense array so every cell alternates in pos/neg value
  let i = 1;
  while (i < arr.length) {
    if (arr[i] <= 0 && arr[i - 1] <= 0) {
      arr.splice(i - 1, 2, arr[i] + arr[i - 1]);
      // console.log("" + arr); //DEBUG
    } else if (arr[i] >= 0 && arr[i - 1] >= 0) {
      arr.splice(i - 1, 2, arr[i] + arr[i - 1]);
      // console.log("" + arr); //DEBUG
    } else {
      i++;
    }
  }
  console.log("condensed: " + arr);
}
/** trimNegativesFromArray(arr)
 * Helper function for getMaxSubSum
 * Removes trailing negative numbers from the array
 * @param {Array} arr (Array of numbers to be trimmed of trailing negative numbers)
 */
function trimNegatives(arr) {
  // trim negative ends of array
  if (arr[0] < 0) arr.shift();
  if (arr[arr.length - 1] < 0) arr.pop();

  console.log("trimmed: " + arr);
}

/** getMaxSubSum(arr)
 * Determine the maximum sum of all subarrays in array
 * Calls: condenseArray, trimNegatives
 * @param {Array} arr (Array of numbers)
 * @returns the maximum sum of all subarrays in array arr
 */
function getMaxSubSum(arr) {
  console.log("Start: " + arr);
  condenseArray(arr);
  trimNegatives(arr);

  // find sum of all sub arrays involving positive numbers
  let max = 0; // max of subarray size 0
  let subSum = 0; // sum of subarray size 0
  // console.log("array length: " + arr.length); //DEBUG
  for (let size = 1; size <= arr.length; size += 2) {
    for (let i = 0; i + size <= arr.length; i += 2) {
      // console.log("size: "+size + "\ni: " + i); //DEBUG
      subSum = sum(arr.slice(i, i + size));
      max = Math.max(subSum, max);
    }
  }
  console.log("max: " + max + "\n");
  return max;
}
// Test function for my solution
function testGetMaxSubSum() {
  getMaxSubSum([-1, 2, 3, -9]) //= 5(the sum of highlighted items)
  getMaxSubSum([2, -1, 2, 3, -9])// = 6
  getMaxSubSum([-1, 2, 3, -9, 11]) //= 11
  getMaxSubSum([-2, -1, 1, 2]) //= 3
  getMaxSubSum([100, -9, 2, -3, 5]) //= 100
  getMaxSubSum([1, 2, 3])// = 6(take all)
  getMaxSubSum([1, -2, -3, 4])// 4  
  getMaxSubSum([700, -2, -3, 1000, -10, 100]); // 1785
}
// Textbook fast solution
function getMaxSubSumFast(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // for each item of arr
    partialSum += item; // add it to partialSum
    maxSum = Math.max(maxSum, partialSum); // remember the maximum
    if (partialSum < 0) partialSum = 0; // zero if negative
  }
  console.log(maxSum);
  return maxSum;
}
// Test function for the textbook fast solution
function testGetMaxSubSumFast() {
  getMaxSubSumFast([-1, 2, 3, -9]) //= 5(the sum of highlighted items)
  getMaxSubSumFast([2, -1, 2, 3, -9])// = 6
  getMaxSubSumFast([-1, 2, 3, -9, 11]) //= 11
  getMaxSubSumFast([-2, -1, 1, 2]) //= 3
  getMaxSubSumFast([100, -9, 2, -3, 5]) //= 100
  getMaxSubSumFast([1, 2, 3])// = 6(take all)
  getMaxSubSumFast([1, -2, -3, 4])// 4  
  getMaxSubSumFast([700, -2, -3, 1000, -10, 100]); // 1785
}

/* ***************************************************************
 * Write defining tables and implement each of the following:
 * **************************************************************/

/***************
 * Input: three numbers a,b,c
 * Process:
 *  - set max to a
 *  - determine if b is greater
 *  - determine if c is greater
 *  - return max
 * Output: greatest of three numbers a,b,c
 * *************/
function maxOfThree(a, b, c) {
  // set a as max
  let max = a;
  // if b is greater, overwrite max
  if (max < b) { max = b; }
  // if c is greater, return c, otherwise max
  return max < c ? c : max;
}
/************************************
 * Input: array of numbers
 * Process:
 *  - set sum to 0
 *  - add each element to sum
 *  - return sum
 * Output: sum of all numbers in array
 ************************************/
function sum(arr) {
  return arr.reduce((out, val) => out += parseFloat(val), 0)
}
/******************************************
 * Input: array of numbers
 * Process:
 *  - set product to 1
 *  - multiply each element by product
 *  - return product
 * Output: product of all numbers in array
 ******************************************/
function multiply(arr) {
  return arr.reduce((out, val) => out *= parseFloat(val), 1)
}
/******************************************
 * Input: array of words
 * Process:
 *  - set longest word length to 0
 *  - for each word, determine if word length 
 *    is greater than current longest word length
 *  - return longest word length
 * Output: lenght of longest word in array
 ******************************************/
function findLongestWord(arr) {
  return arr.reduce((out, val) => { return val.length > out ? val.length : out }, 0)
}
/******************************************
 * Input: array of items
 * Process:
 *  - create new empty array to output
 *  - add items to new array in reverse order of input array 
 *  - return new array
 * Output: array of items in reverse order of input array
 ******************************************/
function reverseArray(arr) {
  let output = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    output.push(arr[i]);
  }
  console.log(arr + " became " + output);
  return output;

}
/******************************************
 * Input: array of items
 * Process:
 *  - reverse items in array by switching 
 *    end to end and moving towards the middle
 * Output: modified array of items
 ******************************************/
function reverseArrayInPlace(arr) {
  let temp;
  console.log(arr);
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }
  console.log(arr);
}

function testSum() {
  console.log("Sum of [1,2,3,4,5] = " + sum([1, 2, 3, 4, 5]));
}
function testMultiply() {
  console.log("Product of [1,2,3,4,5] = " + multiply([1, 2, 3, 4, 5]));
}