"use strict";
/** Sum all numbers till the given one
Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n.

For instance:
    sumTo(1) = 1
    sumTo(2) = 2 + 1 = 3
    sumTo(3) = 3 + 2 + 1 = 6
    sumTo(4) = 4 + 3 + 2 + 1 = 10
    ...
    sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
Make 3 solution variants:
  Using a for loop.
  Using a recursion, cause sumTo(n) = n + sumTo(n - 1) for n > 1.
  Using the arithmetic progression formula.
An example of the result:
    function sumTo(n) { // your code }

    alert(sumTo(100)); // 5050
P.S.Which solution variant is the fastest ? The slowest ? Why ?
P.P.S.Can we use recursion to count sumTo(100000) ? */
function sumToLoop(n) {
  // medium solution
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  ; return sum;
}
function sumToRecursive(n) {
  // slowest solution
  console.debug(n);
  if (n == 1) {
    return 1;
  } else if (n > 10000) {
    return null; // cannot compute recursively
  }
  else {
    return sumToRecursive(n - 1) + n;
  }
}
function sumToArithmeticProgression(n) {
  // fastest solution
  return n * (n + 1) / 2;
}
function testSpeedOfFunctionWithInput(func, input) {
  let testResults = [];
  for (let i = 0; i < 50; i++) {
    let start = Date.now();
    func(input);
    let end = Date.now();
    testResults.push(end - start);
  }
  console.log(testResults.reduce((out, val) => out += val, 0) / testResults.length);
}
function testAllSums() {
  console.log("Recursive: 1");
  testSpeedOfFunctionWithInput(sumToRecursive, 1);
  console.log("Recursive: 10");
  testSpeedOfFunctionWithInput(sumToRecursive, 10);
  console.log("Recursive: 100");
  testSpeedOfFunctionWithInput(sumToRecursive, 100);

  console.log("Loop: 1");
  testSpeedOfFunctionWithInput(sumToLoop, 1);
  console.log("Loop: 10");
  testSpeedOfFunctionWithInput(sumToLoop, 10);
  console.log("Loop: 100");
  testSpeedOfFunctionWithInput(sumToLoop, 100);

  console.log("Progression: 1");
  testSpeedOfFunctionWithInput(sumToArithmeticProgression, 1);
  console.log("Progression: 10");
  testSpeedOfFunctionWithInput(sumToArithmeticProgression, 10);
  console.log("Progression: 100");
  testSpeedOfFunctionWithInput(sumToArithmeticProgression, 100);
}



/**Calculate factorial
The factorial of a natural number is a number multiplied by "number minus one", then by "number minus two", and so on till 1. The factorial of n is denoted as n!
We can write a definition of factorial like this:
    n! = n * (n - 1) * (n - 2) * ...* 1
Values of factorials for different n:
    1! = 1
    2! = 2 * 1 = 2
    3! = 3 * 2 * 1 = 6
    4! = 4 * 3 * 2 * 1 = 24
    5! = 5 * 4 * 3 * 2 * 1 = 120
The task is to write a function factorial(n) that calculates n! using recursive calls.

  alert(factorial(5)); // 120
P.S.Hint: n! can be written as n * (n - 1)! For instance: 3! = 3 * 2! = 3 * 2 * 1! = 6
 */
function factorial(n) {
  if (n == 1) {
    return 1;
  } else if (n <= 0) {
    return null;
  } else {
    return n * factorial(n - 1);
  }
}



/*
Fibonacci numbers
The sequence of Fibonacci numbers has the formula 
  Fn = Fn - 1 + Fn - 2. 
In other words, the next number is a sum of the two preceding ones.
First two numbers are 1, 
  then 2(1 + 1), 
  then 3(1 + 2), 5(2 + 3) 
  and so on: 1, 1, 2, 3, 5, 8, 13, 21....
Fibonacci numbers are related to the Golden ratio and many natural phenomena around us.
Write a function fib(n) that returns the n-th Fibonacci number.
An example of work:
    function fib(n) { // your code  }

    alert(fib(3)); // 2
    alert(fib(7)); // 13
    alert(fib(77)); // 5527939700884757
P.S.The function should be fast. The call to fib(77) should take no more than a fraction of a second.
 */
function fibonacciRecursiveSlow(n) {
  if (n <= 0) { return null; }
  else if (n == 1 || n == 2) { return 1; }
  else { return fibonacciRecursiveSlow(n - 1) + fibonacciRecursiveSlow(n - 2); }
}
function fib(n, previous = 1, current = 1, i = 2) {
  if (n <= 0) {
    // console.log(`0th element of fib is null. i is ${i}`);
    return null;
  }
  else if (n == 1 || n == 2) {
    // console.log(`1st and 2nd element of fib is 1. i is ${i}`);
    return 1;
  }
  else if (i < n) {
    // console.log(`i is ${i}.\ncurrent is ${current}.\nprevious is ${previous}.`);
    let temp = current;
    current = current + previous;
    previous = temp;
    i++;

    // console.log(`i is ${i}.\ncurrent is ${current}.\nprevious is ${previous}.`);
    return fib(n, previous, current, i);
  }
  else {
    return current;
  }

}
function fibonacciLoop(n) {
  if (n == 1 || n == 2) { return 1; }
  let message = "1, 1, ";
  let prev = 1;
  let current = 1;
  let temp;
  for (let i = 2; i < n; i++) {
    temp = current;
    current = current + prev;
    prev = temp;
    message += current + ", ";
  }
  console.log(message);
  return current;
}



/*
Output a single - linked list
Let’s say we have a single - linked list (as described in the chapter Recursion and stack):
    let list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null
          }
        }
      }
    };
Write a function printList(list) that outputs list items one - by - one.
Make two variants of the solution: using a loop and using recursion.
  What’s better: with recursion or without it ?
 */
function printList(list) {
  if (!list.next) {
    console.log(list.value);
  } else {
    console.log(list.value);
    printList(list.next);
  }
}
function testPrintList() {
  let list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
  };
  printList(list);
}



/*
Output a single - linked list in the reverse order
Output a single - linked list from the previous task Output a single - linked list in the reverse order.

Make two solutions: using a loop and using a recursion. */
function printReverseListRecursive(list, message) {
  if (!message) {
    message = "";
  }
  if (list.next) {
    printReverseListRecursive(list.next, list.value + " " + message);
  } else {
    console.log(list.value + " " + message);
  }
}
function printReverseListLoop(list) {
  let message = "";
  while (list.next) {
    message = list.value + " " + message;
    list = list.next;
  }
  console.log(list.value + " " + message);
}
function testPrintReverseList() {
  let list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
  };
  console.log("Recursive:");
  printReverseListRecursive(list);
  console.log("Loop:");
  printReverseListLoop(list)
}