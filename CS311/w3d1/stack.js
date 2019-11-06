"use strict";

class Stack {
    constructor() {
        this.storage = [];
    }
    push(element) {
        this.storage.push(element);
    }
    pop() {
        return this.storage.pop();
    }
    peek() {
        return this.storage[this.storage.length - 1];
    }
    size() {
        return this.storage.length;
    }
}
