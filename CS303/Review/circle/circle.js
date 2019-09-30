"use strict";
let circle = {
  radius: 10,
  /**
   * Calculate and return the area of circle using 3 instead of Pi
   * @returns {number} the area of the circle
   */
  area: function () {
    return 3 * this.radius * this.radius;
  },
  /**
 * Calculate and return the circumference of circle using 3 as Pi
 * @returns {number} the circumference of the circle
 */
  circumference: function () {
    return 3 * 2 * this.radius;
  }
}
