"use strict";
/* global 
ucFirst checkSpam truncate extractCurrencyValue 
getMaxSubSum 
camelize filterRange filterRangeInPlace Calculator unique assert
*/

/***************************** 
 *  STRINGS
******************************/

describe("ucFirst", function () {
  it('Uppercases the first symbol', function () {
    assert.strictEqual(ucFirst("john"), "John");
  });

  it("Doesn't die on an empty string", function () {
    assert.strictEqual(ucFirst(""), "");
  });
});

describe("checkSpam", function () {
  it('finds spam in "buy ViAgRA now"', function () {
    assert.isTrue(checkSpam('buy ViAgRA now'));
  });

  it('finds spam in "free xxxxx"', function () {
    assert.isTrue(checkSpam('free xxxxx'));
  });

  it('no spam in "innocent rabbit"', function () {
    assert.isFalse(checkSpam('innocent rabbit'));
  });
});

describe("truncate", function () {
  it("truncate the long string to the given length (including the ellipsis)", function () {
    assert.equal(
      truncate("What I'd like to tell on this topic is:", 20),
      "What I'd like to te…"
    );
  });

  it("doesn't change short strings", function () {
    assert.equal(
      truncate("Hi everyone!", 20),
      "Hi everyone!"
    );
  });
});

describe("extractCurrencyValue", function () {

  it("for the string $120 returns the number 120", function () {
    assert.strictEqual(extractCurrencyValue('$120'), 120);
  });
});

/*****************************
 *  ARRAYS
******************************/
describe("getMaxSubSum", function () {
  it("Includes middle negatives", function () {
    assert.equal(getMaxSubSum([3, -1, 40]), 42);
  });

  it("Doesn't add all negatives", function () {
    assert.equal(getMaxSubSum([-3, -1, -40]), 0);
  });
  
  it("Identifies sub arrays", function () {
    assert.equal(getMaxSubSum([3, -1, -1000, 3, 87, -3, 40]), 127);
  });
})

/*****************************
 *  ARRAY METHODS
******************************/

describe("camelize", function () {

  it("leaves an empty line as is", function () {
    assert.equal(camelize(""), "");
  });

  it("turns background-color into backgroundColor", function () {
    assert.equal(camelize("background-color"), "backgroundColor");
  });

  it("turns list-style-image into listStyleImage", function () {
    assert.equal(camelize("list-style-image"), "listStyleImage");
  });

  it("turns -webkit-transition into WebkitTransition", function () {
    assert.equal(camelize("-webkit-transition"), "WebkitTransition");
  });
});

describe("filterRange", function () {

  it("returns the filtered values", function () {

    let arr = [5, 3, 8, 1];
    let filtered = filterRange(arr, 1, 4);
    assert.deepEqual(filtered, [3, 1]);
  });

  it("doesn't change the array", function () {

    let arr = [5, 3, 8, 1];
    let filtered = filterRange(arr, 1, 4);
    assert.deepEqual(arr, [5, 3, 8, 1]);
  });

});

describe("filterRangeInPlace", function () {

  it("returns the filtered values", function () {
    let arr = [5, 3, 8, 1];
    filterRangeInPlace(arr, 1, 4);
    assert.deepEqual(arr, [3, 1]);
  });

  it("doesn't return anything", function () {
    assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
  });

});

describe("Calculator", function () {
  let calculator;

  before(function () {
    calculator = new Calculator;
  });

  it("calculate(12 + 34) = 46", function () {
    assert.equal(calculator.calculate("12 + 34"), 46);
  });

  it("calculate(34 - 12) = 22", function () {
    assert.equal(calculator.calculate("34 - 12"), 22);
  });

  it("add multiplication: calculate(2 * 3) = 6", function () {
    calculator.addMethod("*", (a, b) => a * b);
    assert.equal(calculator.calculate("2 * 3"), 6);
  });

  it("add power: calculate(2 ** 3) = 8", function () {
    calculator.addMethod("**", (a, b) => a ** b);
    assert.equal(calculator.calculate("2 ** 3"), 8);
  });
});

describe("unique", function () {
  it("removes non-unique elements", function () {
    let strings = ["Hare", "Krishna", "Hare", "Krishna",
      "Krishna", "Krishna", "Hare", "Hare", ":-O"
    ];

    assert.deepEqual(unique(strings), ["Hare", "Krishna", ":-O"]);
  });

  it("does not change the source array", function () {
    let strings = ["Krishna", "Krishna", "Hare", "Hare"];
    unique(strings);
    assert.deepEqual(strings, ["Krishna", "Krishna", "Hare", "Hare"]);
  });
});