/* eslint-disable require-jsdoc */
"use strict";

// eslint-disable-next-line no-unused-vars
function binarySearch(value, array) {
    let begin = 0;
    let end = array.length;
    while (end - begin > 1) {
        let middle = Math.floor( (begin+end)/2 );
        if (array[middle] > value) {
            end = middle;
        } else {
            begin = middle;
        }
    }
    if (value === array[begin]) {
        return begin;
    } else {
        return -1;
    }
}
