"use strict";
/**
 * Determines maximum value of three inputs.
 * 
 * @param {number} first first number
 * @param {number} second second number
 * @param {number} third third number
 * @returns {number} the max value of the three input numbers or null for NaN input
 */
function maxOfThree(first, second, third) {
  // clean input
  first = parseFloat(first);
  second = parseFloat(second);
  third = parseFloat(third);
  // if no numbers were entered, return null
  if (!(first || second || third)) {
    return null;
  }

  // set max to first
  let max = first || second || third;
  // if second is greater, overwrite max
  if (second && max < second) { max = second; }
  // if third is greater, return third, otherwise max
  return third && max < third ? third : max;
}
/**
 * Adds all numerical elements of an array. 
 * Strings will be parsed to numbers. 
 * NaN values are treated as zero.
 * @param {Array} arr Array of numbers
 * @returns {number} The sum of all numbers in the array. 
 */
function sum(arr) {
  return arr.reduce((out, val) => out += parseFloat(val) || 0, 0)
}
/**
 * find the length of the longest word in an array of words
 * @param {Array} arr Array of words
 * @returns {number} The length of the longest word in the array
 */
function findLongestWord(arr) {
  return arr.reduce((out, val) => { return val.length > out ? val.length : out }, 0)
}
/**
 * returns true when input is a single letter vowel, else false
 * @param {string} letter a single character string
 * @returns {boolean} true when letter is a vowel, else false
 */
function isVowel(letter) {
  switch (letter.toLowerCase()) {
    case "a":
    case "e":
    case "i":
    case "o":
    case "u":
      return true;
    default:
      return false;
  }
}

/**
 * returns reverse string of input string
 * @param {String} string a string to be reversed
 * @returns {string} reverse string of input string
 */
function reverse(string) {
  let output = "";
  string = string.toString();
  // eslint-disable-next-line id-length
  for (let i = string.length - 1; i >= 0; i--) {
    output += string.charAt(i);
  }
  return output;
}
/**
 * removes all words shorter than or equal to length i
 * @param {Array} arr Array of strings/words
 * @param {number} maxLength Minimum length of words to be returned
 * @returns {Array} an array of words greater than length i
 */
function filterLongWords(arr, maxLength) {
  let output = [];
  for (let string of arr) {
    if (string.length > maxLength) {
      output.push(string);
    }
  }
  return output;
}