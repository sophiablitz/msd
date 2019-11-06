"use strict";

class FixedArray {
    constructor(length) {
        this.length = length;
        this.storage = [];
    }
    set(index, element) {
        if (index < 0 || index >= this.length) {
            throw "index out of bounds";
        }
        this.storage[index] = element;
    }
    get(index) {
        if (index < 0 || index >= this.length) {
            throw "index out of bounds";
        }
        return this.storage[index];
    }
}



