"use strict";
/*****************************
 *  DESTRUCTURING ASSIGNMENT
******************************/

/* Destructuring assignment
We have an object:

let user = {
  name: "John",
  years: 30
};
Write the destructuring assignment that reads:

name property into the variable name.
years property into the variable age.
isAdmin property into the variable isAdmin(false, if no such property)
Here’s an example of the values after your assignment:

let user = { name: "John", years: 30 };

// your code to the left side:
// ... = user

alert(name); // John
alert(age); // 30
alert(isAdmin); // false */
/**
 * Runs code for exercise: Destructing Assignment
 * @returns {undefined} undefined
 */
function destructAssignment() {
  let user = {
    name: "John",
    years: 30
  };
  console.log("before destructuring:");
  console.log(user);

  let { name, years: age, isAdmin = false } = user;

  console.log("after destructuring:");
  console.log(name);
  console.log(age);
  console.log(isAdmin);
}


/* The maximal salary
There is a salaries object:
    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };
Create the function topSalary(salaries) that returns the name of the top - paid person.
If salaries is empty, it should return null.
If there are multiple top - paid persons, return any of them.
  P.S.Use Object.entries and destructuring to iterate over key / value pairs. */
/**
 * Run code for exercise: maximal salary
 * @returns {undefined} undefined
 */
function maximalSalary() {
  let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
  };

  console.log("Salaries are:");
  console.log(salaries);
  console.log("Max salary earner is: " + topSalary(salaries));
}
/**
 * returns the name of the top - paid person.
 * If salaries is empty, it should return null.
 * If there are multiple top - paid persons, return any of them.
 * @param {object} salaries object with name:salary as property:value pairs.
 * @returns {string|null} the name of the top salary earner, or null for empty objects.
 */
function topSalary(salaries) {
  let max = 0;
  let maxName = null;

  for (let [key, value] of Object.entries(salaries)) {
    if (value > max) {
      max = value;
      maxName = key;
    }
  }

  return maxName;
}

/*****************************
 *  DATES
******************************/


/* Create a date
Create a Date object for the date: 
Feb 20, 2012, 3:12am. The time zone is local.
Show it using alert. */
/**
 * alert the user of a date object with date Feb 20, 2012, 3:12am
 * @returns {undefined}
 */
function createADate() {
  alert(new Date(2012, 1, 12, 3, 12, 0)); // using arguments for each part of date
  alert(new Date("2012-02-12 03:12:00")); // using string
}



/* Show a weekday
Write a function getWeekDay(date) to show the weekday 
in short format: ‘MO’, ‘TU’, ‘WE’, ‘TH’, ‘FR’, ‘SA’, ‘SU’.

For instance:
    let date = new Date(2012, 0, 3);  // 3 Jan 2012
    alert(getWeekDay(date)); 
 */
/**
 * Executes code for exercise Show a Weekday
 * Alert user of day of week of a preset date
 * @returns {undefined} undefined
 */
function showAWeekday() {
  let date = new Date(2012, 0, 3);  // 3 Jan 2012
  alert(getWeekDay(date));  // should output "TU"
}
/**
 * Get two letter name of a weekday given a date object
 * @param {Date} date a date from which a weekday is calculated
 * @returns {string} The capitalized first two letters of the english word 
 * corresponding with the day of the week
 */
function getWeekDay(date) {
  let daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  return daysOfWeek[date.getDay()];
}


/* European weekday
European countries have days of week starting with 
Monday(number 1), then Tuesday(number 2) and till Sunday(number 7). 
Write a function getLocalDay(date) that returns the “European” day of week for date.

let date = new Date(2012, 0, 3);  // 3 Jan 2012
alert(getLocalDay(date));       // tuesday, should show 2
*/
/**
 * Executes code for exercise europeanWeekday
 * Alert user of day of week of a preset date in European style counting
 * @returns {undefined} undefined
 */
function europeanWeekday() {
  let date = new Date(2012, 0, 3);  // 3 Jan 2012
  alert(getLocalDay(date));       // tuesday, should show 2
}
/**
 * Return the numeric day of the week European style
 * Monday (1) through  Sunday (7).
 *
 * @param {Date} date a date from which to determine the European style day of the week
 * @returns {number} numeric form of the day of the week according to European styling.
 */
function getLocalDay(date) {
  return date.getDay() || 7;
}
/* Which day of month was many days ago ?
Create a function getDateAgo(date, days) to 
return the day of month days ago from the date.

For instance, if today is 20th, 
then getDateAgo(new Date(), 1) should be 19th 
and getDateAgo(new Date(), 2) should be 18th.

Should work reliably for days = 365 or more:
  let date = new Date(2015, 0, 2);

  alert(getDateAgo(date, 1)); // 1, (1 Jan 2015)
  alert(getDateAgo(date, 2)); // 31, (31 Dec 2014)
  alert(getDateAgo(date, 365)); // 2, (2 Jan 2014)
P.S.The function should not modify the given date. */
/**
 * Executes code for exercise which day of month was many days ago?
 * Alert user of date some number of days ago
 * @returns {undefined} undefined
 */
function whichDayOfMonth() {
  let date = new Date(2015, 0, 2);

  alert(getDateAgo(date, 1)); // 1, (1 Jan 2015)
  alert(getDateAgo(date, 2)); // 31, (31 Dec 2014)
  alert(getDateAgo(date, 365)); // 2, (2 Jan 2014)
}
/**
 * Return a date that is a set number of days back from a given date.
 * @param {Date} startDate provided date
 * @param {number} daysAgo number of days ago from date provided
 * @returns {number} date (day of month) that is 'daysAgo' days before startDate
 */
function getDateAgo(startDate, daysAgo) {
  return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - daysAgo).getDate();
}




/* How many seconds has passed today ?
Write a function getSecondsToday() that returns the number of seconds from the beginning of today.
For instance, if now 10: 00 am, and there was no daylight savings shift, then:
getSecondsToday() == 36000 // (3600 * 10)
The function should work in any day. That is, it should not have a hard - coded value of “today”.
 */
/**
 * returns the number of seconds from the beginning of today
 * @returns {number} the number of seconds from the beginning of today
 */
function getSecondsToday() {
  let now = new Date();
  let midnight = new Date(now.getFullYear(), now.getMonth(),now.getDate());
  let seconds = (now - midnight) /1000;
  return seconds;

}


/*****************************
 *  JSON ASSIGNMENT
******************************/

/* 
Turn the object into JSON and back
Turn the user into JSON and then read it back into another variable.

let user = {
  name: "John Smith",
  age: 35
}; */
/**
 * Execute code for exercise turn object into JSON and back
 * @returns {undefined} 
 */
function turnObjectIntoJSON(){
  let user = {
    name: "John Smith",
    age: 35
  }; 
  console.log(user);
  let string = JSON.stringify(user);
  let secondUser = JSON.parse(string);
  console.log(secondUser);
}