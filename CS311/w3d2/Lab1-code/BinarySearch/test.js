"use strict";
/* global describe */
/* global it */
/* global assert */
/* global linearSearch */
/* global binarySearch */
/* global bubbleSort */
/* global insertionSort */

describe("linearSearch", function () {
    let a = [5, 8, 3, 6, 9, 0];
    it("finds the first element in the array", function () {
        let i = linearSearch(5, a);
        assert.equal(i, 0);
    });    
    it("finds the last element in the array", function () {
        let i = linearSearch(0, a);
        assert.equal(i, 5);
    });    
    it("finds a middle element in the array", function () {
        let i = linearSearch(3, a);
        assert.equal(i, 2);
    });    
});

describe ("binarySearch", function() {
    let b = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    it("finds the first element in the array", function () {
        let i = binarySearch(1, b);
        assert.equal(i, 0);
    });    
    it("finds the last element in the array", function () {
        let i = linearSearch(9, b);
        assert.equal(i, 8);
    });    
    it("finds a middle element in the array", function () {
        let i = linearSearch(3, b);
        assert.equal(i, 2);
    });    
});

describe("bubbleSort", function() {
    let a = [5, 8, 3, 6, 9, 0];
    it("sorts the list", function() {
        bubbleSort(a);
        assert.equal(a[0], 0);
        assert.equal(a[1], 3);
        assert.equal(a[2], 5);
        assert.equal(a[3], 6);
        assert.equal(a[4], 8);
        assert.equal(a[5], 9);
    });
});

describe("insertionSort", function() {
    let a = [5, 8, 3, 6, 9, 0];
    it("sorts the list", function() {
        insertionSort(a);
        assert.equal(a[0], 0);
        assert.equal(a[1], 3);
        assert.equal(a[2], 5);
        assert.equal(a[3], 6);
        assert.equal(a[4], 8);
        assert.equal(a[5], 9);
    });
});
