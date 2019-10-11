"use strict";
/**********************
 * CLASS BASIC SYNTAX
 **********************/

/* Rewrite to class
The Clock class is written in functional style.
  Rewrite it the “class ” syntax.
  P.S.The clock ticks in the console, open it to see. */

// Original Code:
/* function Clock({ template }) {
 
  let timer;
 
  function render() {
    let date = new Date();
 
    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;
 
    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;
 
    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;
 
    let output = template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);
 
    console.log(output);
  }
 
  this.stop = function() {
    clearInterval(timer);
  };
 
  this.start = function() {
    render();
    timer = setInterval(render, 1000);
  };
 
}
 
let clock = new Clock({template: 'h:m:s'});
clock.start(); */

/**
 * Clock - given a display template of hours, minutes, 
 * and seconds, log the time every second using methods start and stop
 * @class Clock
 */
class Clock {
  /**
   *Creates an instance of Clock.
   * @param {string} template string with 'h' 'm' and 's' separated 
   * by separators for output format.
   * @memberof Clock
   */
  constructor(template) {
    this.template = template;
    this.timer = undefined;
    /**
     * Render the current time in the console
     * @memberof Clock
     * @returns {undefined}
     */
    this.render = function () {
      let date = new Date();

      let hours = date.getHours();
      if (hours < 10) hours = "0" + hours;

      let mins = date.getMinutes();
      if (mins < 10) mins = "0" + mins;

      let secs = date.getSeconds();
      if (secs < 10) secs = "0" + secs;

      let output = this.template
        .replace("h", hours)
        .replace("m", mins)
        .replace("s", secs);

      console.log(output);
    };
  }


  /**
   * Stop clock from rendering.
   * @memberof Clock
   * @returns {undefined}
   */
  stop() {
    clearInterval(this.timer);
  }
  /**
   * start clock rendering.
   * @memberof Clock
   * @returns {undefined}
   */
  start() {
    this.render();
    this.timer = setInterval(() => { this.render(); }, 1000);
  }

}

let clock = new Clock("h:m:s");

/**
 * Helper function called from button in index.html
 * @returns {undefined}
 */
function startClock() {
  clock.start();

}

/**
 * Helper function called from button in index.html
 * @returns {undefined}
 */
function stopClock() {
  clock.stop();
}