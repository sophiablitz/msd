"use strict";
/**
 * Slides: https://online.cs.mum.edu/access/content/group/f36f088a-b353-4765-bb36-1fd3d8656940/lectures/w1d2codeQuality.pdf
 *
 * Exercises: https://javascript.info/coding-style#tasks
 *   Bad style
 *
 * Exercises: https://javascript.info/ninja-code
 *   Read Ninja Code and write real rules implied by the irony examples
 *
 * Exercises: https://javascript.info/testing-mocha#tasks
 *    What's wrong in the test?
 */


/* Bad Style */

function badStyle() {
  let x = prompt("x?", '');
  let n = prompt("n?", '')

  if (n <= 0) {
    alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
  } else {
    alert(pow(x, n));
  }

  function pow(x, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }
}
/* Ninja Code */
/** 
 * Brevity is the soul of wit:
 * Short code isn't always better. Make code easy to read.
 * 
 * One-letter variables
 * Don't use them with the exception of i (and maybe j) with for loops (and nested for loops).
 * 
 * Use abbreviations
 * Don't arbitrarily try to make long words short for variable names, nor remove vowels from words.
 * 
 * Soar high. Be Abstract.
 * Use meaningful names for variables. Not data types, not general container names, not numbered data vars. 
 * Make clear dinstinctions in variable names so that no two variables are one letter different in name.
 * 
 * Smart Synonyms
 * When naming variables or specifically functions
 *  - use prefixes consistently (if you use prefix 'display' for multiple functions, they should all display in the same manner)
 *  - use different prefixes for different functionality (don't use 'show' and 'display' for the same functionality)
 * 
 * Reuse Names
 * Once a variable is used for one purpose, don't reuse it for another
 * 
 * Underscores for fun
 * Don't use prefix of '_' without very clear guidelines and strict adherence
 * 
 * Show your love
 * Avoid inflating prefixes like uber, super, mega,...etc
 * 
 * Overlap Outer Variables
 * Don't shadow with functions -- don't reuse variable names in functions
 * 
 * Side effects everywhere
 * Don't perform changes/commands in a query function
 * Return simply the expected result of a function
 * 
 * Powerful Functions
 * Only perform the commands/actions expected by the name of a function
 * Keep one task in each functions so that they are easy to test and to reuse
 * 
 * 
 */


/* What's wrong in the test? */

// Original test
it("Raises x to the power n", function () {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});

// Fixed tests
describe("Raises x to the power n", function () {
  it("5 to the power 1 equals 5", function () {
    assert.equal(pow(5, 1), 5);
  });
  it("5 to the power 2 equals 25", function () {
    assert.equal(pow(5, 2), 25);
  });
  it("5 to the power 3 equals 125", function () {
    assert.equal(pow(5, 3), 125);
  });
})