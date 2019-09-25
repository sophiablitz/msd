"use strict";
/* global maxOfThree sum  findLongestWord isVowel filterLongWords reverse assert*/

/** maxOfThree Unit Tests */
describe("maxOfThree handles positive integers", function () {
  it("should return 3 for values 1,2,3", function () {
    assert.equal(maxOfThree(1, 2, 3), 3);
  });
  it("should return 3 for values 1,3,2", function () {
    assert.equal(maxOfThree(1, 3, 2), 3);
  });
  it("should return 3 for values 3,1,2", function () {
    assert.equal(maxOfThree(3, 1, 2), 3);
  });
});
describe("maxOfThree handles negative integers", function () {
  it("should return -1 for values -1,-2,-3", function () {
    assert.equal(maxOfThree(-1, -2, -3), -1);
  });
  it("should return -1 for values -1,-3,-2", function () {
    assert.equal(maxOfThree(-1, -3, -2), -1);
  });
  it("should return -1 for values -3,-1,-2", function () {
    assert.equal(maxOfThree(-3, -1, -2), -1);
  });
});
describe("maxOfThree ignores NaN values", function () {
  it("should return 1 for values 'asdf', 'asd', 1", function () {
    assert.equal(maxOfThree("asdf", "asd", 1), 1);
  });
  it("should return 1 for values 'asdf', 1, 'asd'", function () {
    assert.equal(maxOfThree("asdf", 1, "asd"), 1);
  });
  it("should return 1 for values 1, 'asdf', 'asd'", function () {
    assert.equal(maxOfThree(1, "asdf", "asd"), 1);
  });
  it("should return null for values 'asdf', 'asd', 'as'", function () {
    assert.equal(maxOfThree("asdf", "asd", "as"), null);
  });
});

/** sum Unit Tests */
describe("Sum handles positive integers", function () {
  it("should return 10 for array [4,3,2,1]", function () {
    assert.equal(sum([1, 2, 3, 4]), 10);
  });
});
describe("Sum handles positive and negative integers", function () {
  it("should return 3 for array [-6,9]", function () {
    assert.equal(sum([-6, 9]), 3);
  });
});
describe("Sum handles empty arrays", function () {
  it("should return 0 for array []", function () {
    assert.equal(sum([]), 0);
  });
});
describe("Sum handles arrays of words", function () {
  it("should return 0 for array ['asdf']", function () {
    assert.equal(sum(["asdf"]), 0);
  });
});

/** findLongestWord Unit Tests */
describe("findLongestWord handles arrays of strings", function () {
  it("should return 4 for array ['asdf','asd','as']", function () {
    assert.equal(findLongestWord(["asdf", "asd", "as"]), 4);
  });
  it("should return 4 for array ['asdf','asd','']", function () {
    assert.equal(findLongestWord(["asdf", "asd", ""]), 4);
  });
});
describe("findLongestWord ignores numbers", function () {
  it("should return 0 for array [123]", function () {
    assert.equal(findLongestWord([123]), 0);
  });
  it("should return 4 for array [123, 'asdf']", function () {
    assert.equal(findLongestWord([123, "asdf"]), 4);
  });
});
describe("findLongestWord handles empty arrays", function () {
  it("should return 0 for array []", function () {
    assert.equal(findLongestWord([]), 0);
  });
});


/* isVowel Unit Tests*/
describe("isVowel", function () {

  it("a is vowel", function () {
    assert.equal(isVowel("a"), true);
  });
  it("e is vowel", function () {
    assert.equal(isVowel("e"), true);
  });
  it("i is vowel", function () {
    assert.equal(isVowel("i"), true);
  });
  it("o is vowel", function () {
    assert.equal(isVowel("o"), true);
  });
  it("u is vowel", function () {
    assert.equal(isVowel("u"), true);
  });

  it("z is not vowel", function () {
    assert.equal(isVowel("z"), false);
  });

  it("5 is not vowel", function () {
    assert.equal(isVowel("5"), false);
  });
});

/** reverse Unit Test */
describe("reverse handles string inputs", function () {
  it("returns 'asdf' for input 'fdsa'", function () {
    assert.equal(reverse('fdsa'), 'asdf');
  });
  it("returns '' for input ''", function () {
    assert.equal(reverse(""), "");
  });
});
describe("reverse handles defined non-string inputs", function () {
  it("returns '321' for input 123", function () {
    assert.equal(reverse(123), '321');
  });
  it("returns 'eslaf' for input false", function () {
    assert.equal(reverse(false), 'eslaf');
  });
  it("returns 'NaN' for input NaN", function () {
    assert.equal(reverse(NaN), 'NaN');
  });
});

/** filterLongWords Unit Test */

describe("filterLongWords handles arrays of strings", function () {
  it("returns array of all non-empty strings with input of non-empty strings and i=0", function () {
    assert.deepEqual(filterLongWords(['one', 'two', 'three'], 0), ['one', 'two', 'three']);
  });
  it("returns array of all non-empty strings with input including empty and non-empty strings, i=0", function () {
    assert.deepEqual(filterLongWords(['', 'two', 'three'], 0), ['two', 'three']);
  });
  it("returns array of all strings with input of non-empty strings and i=-1", function () {
    assert.deepEqual(filterLongWords(['one', 'two', 'three'], -1), ['one', 'two', 'three']);
  });
  it("returns array of all strings with input including empty and non-empty strings, i=-1", function () {
    assert.deepEqual(filterLongWords(['', 'two', 'three'], -1), ['', 'two', 'three']);
  });
  it("returns array of all strings longer than i with input i=3", function () {
    assert.deepEqual(filterLongWords(['one', 'two', 'three'], 3), ['three']);
  });
  it("returns empty array with input of short strings and i=3", function () {
    assert.deepEqual(filterLongWords(['one', 'two', 'six'], 3), []);
  });
});
