"use strict";
/**
 * Calculate age of user based on input text boxes 'year', 'month', and 'day'.
 * Displays age in div 'ageOutput'.
 * @returns {undefined}
 */
function calculateAge() {
  //get values
  let year = document.getElementById("year").value;
  let month = document.getElementById("month").value;
  let day = document.getElementById("day").value;

  // parse input to numbers
  try {
    year = parseInputToInteger(year);
    month = parseInputToInteger(month);
    day = parseInputToInteger(day);
  } catch (err) {
    alert(err.message + ". Please try again");
  }
  // validate date
  try {
    validateYear(year);
    document.getElementById("year").style = "background-color:none; color:black;";
    validateDate(year, month, day);
    document.getElementById("month").style = "background-color:none; color:black;";
    document.getElementById("day").style = "background-color:none; color:black;";

    // calculate age
    let now = new Date();
    let DOB = new Date(year, month - 1, day);
    let ageInMs = now - DOB;

    let ageInDays = Math.floor(ageInMs / (60 * 60 * 24 * 1000));
    let ageInYears = ageInDays/365; //float
    let exactYears = Math.floor(ageInYears); //integer
    let extraDays = Math.floor((ageInYears - exactYears)*365);  // integer

    // display age
    document.getElementById("ageOutput").innerHTML = `Age in days: ${ageInDays}. <br>Age in years: ${exactYears} years and ${extraDays} days.`;
  } catch (err) {
    if (err instanceof ValidationError) {
      if (err.property == "Month") {
        document.getElementById("month").style="background-color:red; color:white;";
      } else if (err.property == "Year") {
        document.getElementById("year").style = "background-color:red; color:white;";
      } else if (err.property == "Day") {
        document.getElementById("day").style = "background-color:red; color:white;";
      }
      alert(err.message);
      
    } else {
      throw err;
    }
  }

  
}
/**
 * parse a string into an integer
 * @param {string} value a string input
 * @throws {Error} value was not numeric
 * @returns {number} the numeric value of the string
 */
function parseInputToInteger(value) {
  let number = parseInt(value, 10);
  if (isNaN(number)) {
    throw new Error("ERROR: " + value + " is not a number");
  }
  return number;
}
/**
 *
 *
 * @class ValidationError
 * @extends {Error}
 */
class ValidationError extends Error {
  /**
   *Creates an instance of ValidationError.
   * @param {sring} property name of value that is invalid
   * @param {string} message error message
   * @memberof ValidationError
   */
  constructor(property, message) {
    super(message);
    this.property = property;
    this.name = "ValidationError";
  }

}
/**
 * Validate given year is possible birth year
 *
 * @param {number} year year of birth
 * @throws {ValidationError}
 * @returns {undefined}
 */
function validateYear(year) {
  let currentYear = new Date().getFullYear();
  if (year < 100 || year > currentYear) {
    throw new ValidationError("Year", `${year} must be greater than 100 and not greater than ${currentYear}.`);
  }

}
/**
 * Validate a date
 *
 * @param {number} year year of date
 * @param {number} month month of date 1-12 for January through December
 * @param {number} day day of month 1-31
 * @throws {ValidationError}
 * @returns {undefined}
 */
function validateDate(year, month, day) {
  let maxDay;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      maxDay = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      maxDay = 30;
      break;
    case 2:
      if (year % 4 == 0 && year % 400 == 0) {
        maxDay = 29;
      } else {
        maxDay = 28;
      }
      break;
    default:
      throw new ValidationError("Month", `${month} is not a valid month.` );

  }

  if (day < 1 || day > maxDay) {
    throw new ValidationError("Day", `${day} is not a valid day of month ${month} of ${year}.`);
  }
}
