"use strict";
/* global assert map reduce forEach */
/***********************
 *  MAP TESTS
 ***********************/
describe("My Map", function () {
  it("Doubles an array: [1,2,3] => [2,4,6]", function () {

    let array = [1, 2, 3];
    assert.deepEqual(map(array, mapDouble), [2,4,6]);
    assert.deepEqual(map(array, mapDouble), array.map(mapDouble));
  });

  it("Add array sum to each element of an array: [1,2,3] => [7,8,9]", function () {
    let array = [1, 2, 3];
    assert.deepEqual(map(array, mapSumOfArrayPlusValue), [7,8,9]);
    assert.deepEqual(map(array, mapSumOfArrayPlusValue), array.map(mapSumOfArrayPlusValue));
  });

  it("Allows changes of original array within callback function", function () {
    let array1 = [1, 2, 3];
    let array2 = [1, 2, 3];
    let output1 = map(array1, doubleOriginalArray);
    let output2 = array2.map(doubleOriginalArray);
    assert.deepEqual(array1, array2);
    assert.deepEqual(output1, output2);
    assert.deepEqual(array1, [2,4,6]);
  });
});

/***********************
 *  FOREACH TESTS
 ***********************/
describe("My forEach", function () {
  it("Doubles an array", function () {

    let array1 = [1, 2, 3];
    let array2 = [1, 2, 3];
    forEach(array1, mapDouble);
    array2.forEach(mapDouble);
    assert.deepEqual(array1, array2);
  });

  it("Sums and adds elements to an array", function () {
    let array1 = [1, 2, 3];
    let array2 = [1, 2, 3];
    forEach(array1, mapSumOfArrayPlusValue);
    array2.forEach(mapSumOfArrayPlusValue);
    assert.deepEqual(array1, array2);
  });

  it("Allows changes of original array within callback function", function () {
    let ogArray = [1, 2, 3];
    let myArray = [1, 2, 3];
    ogArray.forEach(doubleOriginalArray);
    forEach(myArray, doubleOriginalArray);
    assert.deepEqual(ogArray, myArray);
  });
});

/***********************
 *  REDUCE TESTS
 ***********************/
describe("my Reduce", function () {
  it("sums an array without initialValue", function () {
    let array1 = [3, 2, 1];
    let array2 = [3, 2, 1];
    let output1 = reduce(array1, reduceToSum);
    let output2 = array2.reduce(reduceToSum);
    console.log(output1);
    console.log(output2);
    assert.equal(output1, output2);
  });
  it("sums an array with initialValue", function () {
    let array1 = [3, 2, 1];
    let array2 = [3, 2, 1];
    let output1 = reduce(array1, reduceToSum, 0);
    let output2 = array2.reduce(reduceToSum, 0);

    console.log(output1);
    console.log(output2);
    assert.equal(output1, output2);
  });
  it("allows changes of original array within callback function", function () {
    let array1 = [1, 2, 3];
    let array2 = [1, 2, 3];

    console.log("Before change and reduce 1:");
    console.log(array1);
    console.log("Before change and reduce 2:");
    console.log(array2);
    let red1 = reduce(array1, doubleOriginalArrayAndReduce);
    let red2 = array2.reduce(doubleOriginalArrayAndReduce);
    console.log("After change and reduce 1:");
    console.log(array1);
    console.log("reduced to :" + red1);
    console.log("After change and reduce 2:");
    console.log(array2);
    console.log("reduced to :" + red2);

    assert.deepEqual(array1, array2);
    assert.equal(red1, red2);
  });
});
/***********************
 *  FILTER TESTS
 ***********************/
describe("my Filter", function () {
  it("Handles empty input", function () {
    let array1 = [];
    let array2 = [];

    let output1 = filter(array1, filterEven);
    let output2 = array2.filter(filterEven);
    console.log(output1);
    console.log(output2);

    assert.deepEqual(output1, output2);
  });
  it("Handles elements matching criteria with one param", function () {
    let array1 = [3, 2, 1];
    let array2 = [3, 2, 1];

    let output1 = filter(array1, filterEven);
    let output2 = array2.filter(filterEven);
    console.log(output1);
    console.log(output2);

    assert.deepEqual(output1, output2);
  });
  it("Handles elements matching criteria with two params", function () {
    let array1 = [3, 2, 1];
    let array2 = [3, 2, 1];

    let output1 = filter(array1, filterEvenIndex);
    let output2 = array2.filter(filterEvenIndex);
    console.log(output1);
    console.log(output2);

    assert.deepEqual(output1, output2);
  });
  it("Handles elements matching criteria with three params", function () {
    let array1 = [3, 2, 1];
    let array2 = [3, 2, 1];

    let output1 = filter(array1, filterIndexIsFactorOfLength);
    let output2 = array2.filter(filterIndexIsFactorOfLength);
    console.log(output1);
    console.log(output2);

    assert.deepEqual(output1, output2);
  });
  it("allows changes to be made in callback function: input array changes element by element", function () {
    let array1 = [3, 2, 1];
    let array2 = [3, 2, 1];

    let output1 = filter(array1, doubleOriginalArrayAndFilterEven);
    let output2 = array2.filter(doubleOriginalArrayAndFilterEven);
    console.log(array1);
    console.log(array2);

    assert.deepEqual(array1, array2);
    assert.deepEqual(array1, [6,4,2]);
  });
  it("allows changes to be made in callback function, output contains original data", function () {
    let array1 = [3, 2, 1];
    let array2 = [3, 2, 1];

    let output1 = filter(array1, doubleOriginalArrayAndFilterEven);
    let output2 = array2.filter(doubleOriginalArrayAndFilterEven);
    console.log(output1);
    console.log(output2);

    assert.deepEqual(output1, output2);
    assert.deepEqual(output1, [3,2,1]);
  });
  it("allows changes to be made in callback function that affect all the original array values, changes to array values made before an element is tested against the filter will affect the filter results, output contains data that has been changed in prior callbacks", function () {
    let array1 = [1, 1, 1];
    let array2 = [1, 1, 1];

    let output1 = filter(array1, changeHereOnInArrayAndFilterOnes);
    let output2 = array2.filter(changeHereOnInArrayAndFilterOnes);
    console.log(output1);
    console.log(output2);

    assert.deepEqual(output1, output2);
    assert.deepEqual(array1, array2);
    assert.deepEqual(output1, [1]);
    assert.deepEqual(array1, [2, 3, 4]);
  });
});

/***********************
 *  HELPER METHODS
 ***********************/
function reduceToSum(out, val) {
  return out += val;
}
function mapDouble(a) {
  return a * 2;
}
function mapPlus1(val, i, arr) {
  return arr[i] + 1;
}
function mapSumOfArrayPlusValue(val, i, arr) {
  return val + arr.reduce((out, val) => out += val, 0);
}
function doubleOriginalArray(val, i, arr) {
  arr[i] = arr[i]*2;
}
function doubleOriginalArrayAndMapPlus1(val, i, arr) {
  arr[i] = arr[i] * 2;
}
function doubleOriginalArrayAndReduce(out, val, i, arr) {
  doubleOriginalArray(val, i, arr);
  return reduceToSum(out, val);
}
function filterEven(val,i,arr) {
  return arr[i] % 2 === 0;
}
function filterEvenIndex(val, i) {
  return i % 2 === 0;
}
function filterIndexIsFactorOfLength(val, i, arr) {
  return i == 0 ? false : arr.length % i == 0;
}
function doubleOriginalArrayAndFilterEven(val, i, arr) {
  doubleOriginalArray(val, i, arr);
  return filterEven(val,i,arr);
}
function changeHereOnInArrayAndFilterOnes(val,i,arr) {
  for(i;i<arr.length;i++){
    arr[i]++;
  }
  return val==1;
}

let array1 = [1, 2, 3];
console.log("array1:");
console.log(array1);
let filteredArray = array1.filter(doubleOriginalArrayAndFilterEven);

console.log("array1:");
console.log(array1);
console.log("filteredArray:");
console.log(filteredArray);


let array2 = [1, 2, 3];
console.log("array2:");
console.log(array2);
let filteredArray2 = filter(array1,doubleOriginalArrayAndFilterEven);
console.log("array2:");
console.log(array2);
console.log("filteredArray2:");
console.log(filteredArray2);