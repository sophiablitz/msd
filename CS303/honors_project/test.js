"use strict";
/* global Egg assert */
let outputID = "output";
let egg = new Egg(outputID);
/***************
 * MOCHA TESTS *
 ***************/

describe("Egg", function () {
  describe("Special Form: set", function () {
    it("Sets variable up the scope chain", function () {
      let outputElement = document.getElementById(outputID);
      outputElement.value = "";
      egg.run(`
            do(define(x, 4),
              define(setx, fun(val, set(x, val))),
              setx(50),
              print(x))
            `);


      assert.equal(outputElement.value, 50);
    });
    it("Throws reference error when no binding is found", function () {
      let error = null;
      try {
        egg.run("set(quux, true)");
      } catch (err) {
        error = err;
      }
      assert.instanceOf(error, ReferenceError, "error is an instance of ReferenceError");
    });
  });
  describe("Top Scope: Arrays", function () {
    it("Arrays can be used.", function () {
      let outputElement = document.getElementById(outputID);
      outputElement.value = "";
      egg.run(` do(
                  define(
                    myArray,
                    array(1,2,3)
                  ),
                  define(
                    sum, 
                    fun(array,do(
                        define(i, 0),
                        define(sum, 0),
                        while(
                          <(i,length(array)),
                          do(
                            define(sum,+(sum, element(array, i))),
                            define(i, +(i, 1)))),
                        sum))),
                  print(sum(myArray)))
              `);
      assert.equal(outputElement.value, 6);
    });
    it("Arrays can be defined and accessed.", function () {
      let outputElement = document.getElementById(outputID);
      outputElement.value = "";
      egg.run(`
              do(define(myArray,array(1,2,3)),print(myArray))`);
      assert.equal(outputElement.value, "1,2,3\n");
    });
    it("Array elements can be accessed and printed.", function () {
      let outputElement = document.getElementById(outputID);
      outputElement.value = "";
      egg.run(`
              do(define(myArray,array(1,2,3)),print(element(myArray,1)))`);
      assert.equal(outputElement.value, "2\n");
    });
    it("Array length can be accessed and printed.", function () {
      let outputElement = document.getElementById(outputID);
      outputElement.value = "";
      egg.run(`
              do(define(myArray,array(1,2,3)),print(length(myArray)))`);
      outputElement = document.getElementById(outputID);
      assert.equal(outputElement.value, "3\n");
    });

  });
  describe("SkipSpace skips comments", function () {
    it("Comments can appear first in a program", function () {
      let outputElement = document.getElementById(outputID);
      outputElement.value = "";
      egg.run(` #laksjdf
                do(
                  define(x,4),
                  print(x)
                )`);
      outputElement = document.getElementById(outputID);
      assert.equal(outputElement.value, 4);
    });
    it("Comments can appear last in a program", function () {
      let outputElement = document.getElementById(outputID);
      outputElement.value = "";
      egg.run(` do(
                  define(x,4),
                  print(x)
                )
                #alskdjfasdlkfj`);
      outputElement = document.getElementById(outputID);
      assert.equal(outputElement.value, 4);
    });
    it("Comments can appear in the middle of a program", function () {
      let outputElement = document.getElementById(outputID);
      outputElement.value = "";
      egg.run(` do(
                  define(x,4),
                  #alskdjfasdlkfj
                  print(x)
                )`);
      outputElement = document.getElementById(outputID);
      assert.equal(outputElement.value, 4);
    });
  });
  describe("Functions can be called, with Closures", function () {
    it("Functions can be created and called", function () {
      let outputElement = document.getElementById(outputID);
      outputElement.value = "";
      egg.run(`do(
              define(plusOne, fun(a, +(a, 1))),
              print(plusOne(10)))
            `);
      outputElement = document.getElementById(outputID);
      assert.equal(outputElement.value, 11);
    });
    it("A function defined within a function accesses the variables defined externally", function () {
      let outputElement = document.getElementById(outputID);
      outputElement.value = "";
      egg.run(` do(
                  define(f, fun(a, fun(b, +(a, b)))),
                  print(f(4)(5)))
              `);
      outputElement = document.getElementById(outputID);
      assert.equal(outputElement.value, 9);
    });
  });
  describe("Define allows use of external scope within code blocks", function () {
    it("A variable defined outside of a while look is modified within a while loop.", function () {
      let outputElement = document.getElementById(outputID);
      outputElement.value = "";
      egg.run(` do(define(total, 0),
                  define(count, 1),
                  while(<(count, 11),
                        do(define(total, +(total, count)),
                            define(count, +(count, 1)))),
                  print(total))
                `);
      outputElement = document.getElementById(outputID);
      assert.equal(outputElement.value, 55);
    });
  });
  describe("Parse", function () {
    it("Creates object for call with operator '+'", function () {
      assert.deepEqual(egg.parse("+(a, 10)"), {
        type: "apply",
        operator: {
          type: "word",
          name: "+"
        },
        args: [{
          type: "word",
          name: "a"
        }, {
          type: "value",
          value: 10
        }]
      });
    });
    it("Creates object for call with define", function () {
      assert.deepEqual(egg.parse("define(a, 10)"), {
        type: "apply",
        operator: {
          type: "word",
          name: "define"
        },
        args: [{
          type: "word",
          name: "a"
        }, {
          type: "value",
          value: 10
        }]
      });
      document.getElementById(outputID).value = "";
    });

    
  });
});