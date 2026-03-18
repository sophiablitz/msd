"use strict";
let initialArray = [1,-22,3000];
/* **********************
 * Functions without Map
 ************************/

/**
 * Square every value in an array
 *
 * @param {Array} arr Array of numbers
 * @returns {Array} array with squared valued
 */
function squareAnArray(arr){
  let result = [];
  // eslint-disable-next-line id-length
  for(let i =0; i<arr.length;i++){
    result.push(square(arr[i]));
  }
  return result;
}
/**
 * Multiply every value in an array by 1000
 *
 * @param {Array} arr Array of numbers
 * @returns {Array} array with values mulitplied by 1000
 */
function multiplyAnArrayBy1000(arr) {
  let result = [];
  // eslint-disable-next-line id-length
  for (let i = 0; i < arr.length; i++) {
    result.push(multiplyBy1000(arr[i]));
  }
  return result;
}
/**
 * Make every value in an array it's negative
 *
 * @param {Array} arr Array of numbers
 * @returns {Array} array with negative of each value
 */
function makeAnArrayNegative(arr) {
  let result = [];
  // eslint-disable-next-line id-length
  for (let i = 0; i < arr.length; i++) {
    result.push(makeNegative(arr[i]));
  }
  return result;
}
/**
 * Divide every value in an array by 10
 *
 * @param {Array} arr Array of numbers
 * @returns {Array} array with values divided by 10
 */
function divideArrayBy10(arr) {
  let result = [];
  // eslint-disable-next-line id-length
  for (let i = 0; i < arr.length; i++) {
    result.push(dividedBy10(arr[i]));
  }
  return result;
}

/* *******************
 * Functions with Map
 **********************/

function squareAnArrayWithMap(arr) {
  return arr.map(square);
}
function multiplyAnArrayBy1000WithMap(arr) {
  return arr.map(multiplyBy1000);
}
function makeAnArrayNegativeWithMap(arr) {
  return arr.map(makeNegative);
}
function divideArrayBy10WithMap(arr) {
  return arr.map(dividedBy10);
}

function square(val){
  return val*val;
}
function multiplyBy1000(val) {
  return val * 1000;
}
function makeNegative(val) {
  return val * (-1);
}
function dividedBy10(val) {
  return val / 10;
}
/**
 * output a message to the screen in div 'arrayOutput'
 *
 * @param {string} message message to be displayed
 * @returns {undefined}
 */
function output(message){
  document.getElementById("arrayOutput").innerHTML = message;
}