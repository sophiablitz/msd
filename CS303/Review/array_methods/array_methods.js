"use strict";
/**
 * Calls a function for every element in an array and returns the resulting array of elements
 *
 * @param {Array} arr array of elements to use as arguments for func
 * @param {function(item, index, array)} func function with parameters item, index, 
 * and array that will be called for each element of an array.
 * @returns {Array} a new array with elements determined by func being called on input arr elements
 */
function map(arr, func){
  let output = [];
  for (let i = 0;i<arr.length;i++){
    output.push(func(arr[i],i,arr));
  }
  return output;
}

/**
 * Reduce an array to one value by performing a function on each element of the array
 * given an initial value for the output.
 * @param {Array} arr array of elements to call func with each element
 * @param {function(output: T, item, index, array)} func function with parameters
 * output, item, index, and array that will be called for each element of an array
 * and will return the next value of output.
 * @param {T} initialValue the initial value of output
 * @returns {T} the cumulative result of calling func on all elements of arr
 */
function reduce(arr, func, initialValue){
  // start loop with zero and interate over all elements (unless...)
  let i=0; 
  // If no initial value, use first element of array as initial value and skip i=0 in loop.
  if(!initialValue && arr.length){
    initialValue = arr[0]; // set initial value from first element of array
    i = 1; // skip element at index 0
  }
  for ( ; i<arr.length;i++) {
    initialValue = func(initialValue,arr[i],i,arr);
  }
  return initialValue;
}

/**
 * Calls a function for every element in an array
 *
 * @param {Array} arr array of elements to call func with each element
 * @param {function(item, index, array)} func function with parameters item, index,
 * and array that will be called for each element of an array.
 * @returns {undefined}
 */
function forEach(arr,func){
  for (let i = 0; i < arr.length; i++) {
    func(arr[i], i, arr);
  }
}


/**
 * Create an array of all elements that meet the criteria 
 of a given function as evaluated on an array of elements.
 *
 * @param {Array} arr Array of elements to test criteria
 * @param {function(item, index, array)=>boolean} func function to determine 
 * if an element should remain as part of the output array by returning true or false
 * @returns {Array} Array of elements that meet criteria in function func
 */
function filter(arr, func) {
  let output = [];
  for (let i = 0; i < arr.length; i++) {
    output.push(arr[i]);
    if (!func(arr[i], i, arr)) {
      output.pop(arr[i]);
    }
  }
  return output;
}