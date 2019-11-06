/* eslint-disable require-jsdoc */
/* global FixedArray */
"use strict";

// eslint-disable-next-line no-unused-vars
class ArrayList {
    constructor(initialCapacity) {
        if (arguments[0] === undefined) {
            initialCapacity = 10;
        }
        this.capacity = initialCapacity;
        this.length = 0;
        this.storage = new FixedArray(initialCapacity);
    }
    add(element) {
        // if we're at maximum capacity for our storage
        if (this.length === this.capacity) {
            // create a new, bigger FixedArray
            let bigger = this.capacity + (this.capacity << 1);
            let newStorage = new FixedArray(bigger);
            // copy elements across
            for (let i = 0; i < this.capacity; i++) {
                let e = this.storage.get(i);
                newStorage.set(i, e);
            }
            // make the new fixedArray our storage
            this.storage = newStorage;
            this.capacity = bigger;
        }
        // insert into storage
        this.storage.set(this.length, element);
        this.length++;
    }
    insert(index, element) {
        if (index < 0 || index > this.length) {
            throw "index out of bounds";
        }
        // if we're inserting at the end
        if (index == this.length) {
            this.add(element);
            return;
        }
        // if we're not at maximum capacity
        if (this.length + 1 !== this.capacity) {
            // move everything after index up one spot
            for (let i = this.length - 1; i >= index; i--) {
                this.storage.set(i + 1, this.storage.get(i));
            }
            // set our element in the created space
            this.storage.set(index, element);
        }
        else {
            // create a new, bigger FixedArray
            let bigger = this.capacity + (this.capacity << 1);
            let newStorage = new FixedArray(bigger);
            // copy elements before index
            for (let i = 0; i < index; i++) {
                let e = this.storage.get(i);
                newStorage.set(i, e);
            }
            // set our element at index
            newStorage.set(index, element);
            // copy remaining elements 1 spot over
            for (let i = index; i < this.capacity; i++) {
                let e = this.storage.get(i);
                newStorage.set(i + 1, e);
            }
            // make the new fixedArray our storage
            this.storage = newStorage;
            this.capacity = bigger;
        }
        this.length++;
    }
    get(index) {
        if (index < 0 || index >= this.length) {
            throw "index out of bounds";
        }
        return this.storage.get(index);
    }
    set(index, element) {
        if (index < 0 || index >= this.length) {
            throw "index out of bounds";
        }
        this.storage.set(index, element);
    }
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw "index out of bounds";
        }
        if (index !== this.length - 1) {
            for (let i = index + 1; i < this.length; i++) {
                this.storage.set(i - 1, this.storage.get(i));
            }
        } // else just reduce the length
        this.length--;
    }
    size() {
        return this.length;
    }
    [Symbol.iterator]() {
        let index = 0;
        const myArrayList = this;
        const iterator = {
            next: function () {
                const done = (index >= myArrayList.size());
                const result = { "done": done };
                if (!done) {
                    result.value = myArrayList.get(index);
                    index++;
                }
                return result;
            }
        };
        return iterator;
    }
    sort(comparator) {
        // insertion sort, modifies internal data and returns itself
        for (let sorted = 1; sorted < this.length; sorted++) {
            let consider = sorted;
            for (let compare = sorted - 1; compare >= 0; compare--) {
                if (comparator(this.get(consider), this.get(compare)) < 0) {
                    let temp = this.get(consider);
                    this.set(consider, this.get(compare));
                    this.set(compare, temp);
                    consider--;
                } else {
                    break;
                }
            }
        }
        return this;
    }
    contains(value) {
        let begin = 0;
        let end = this.length;
        while (end - begin > 1) {
            let middle = Math.floor((begin + end) / 2);
            if (this.get(middle) > value) {
                end = middle;
            } else {
                begin = middle;
            }
        }
        if (value == this.get(begin)) {
            return begin;
        } else {
            return -1;
        }
    }
    containsRec(value) {
        return this._recurseContains(this.storage.storage.slice(0,this.length),value);
    }
    _recurseContains(array,value) {
        if (array.length > 1) {
            let middle = Math.floor((array.length) / 2);
            if (array[middle] > value) {
                return this._recurseContains(array.slice(0,middle),value);
            } else if (array[middle] < value) {
                let indexOf = this._recurseContains(array.slice(middle, array.length),value);
                if (indexOf == -1){ 
                    return -1 
                }else {
                    return middle + indexOf;
                }
            }
            else{
                return middle;
            }
        } else if (array.length == 1) {
            if (array[0] == value) {
                return 0;
            }
        }
        return -1;

    }
}
