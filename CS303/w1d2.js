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