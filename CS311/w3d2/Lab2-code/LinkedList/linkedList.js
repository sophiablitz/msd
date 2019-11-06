/* eslint-disable require-jsdoc */
"use strict";

// eslint-disable-next-line no-redeclare
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

// eslint-disable-next-line no-unused-vars
class LinkedList {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }
    add(element) {
        let newNode = new Node(element);
        if (this.first === null) {
            this.first = newNode;
        }
        if (this.last !== null) {
            this.last.next = newNode;
        }
        this.last = newNode;
        this.length++;
    }
    insert(index, element) {
        if (index < 0 || index > this.length) {
            throw "index out of bounds";
        }
        if (index === this.length) {
            this.add(element);
            return;
        }
        let newNode = new Node(element);
        if (index === 0) {
            newNode.next = this.first;
            this.first = newNode;
        }
        else {
            // go to the node before index
            let node = this.first;
            for (let i = 0; i < index - 1; i++) {
                node = node.next;
            }
            newNode.next = node.next;
            node.next = newNode;
        }
        this.length++;
    }
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw "index out of bounds";
        }
        if (index === 0) {
            this.first = this.first.next;
        }
        else {
            let node = this.first;
            for (let i = 0; i < index - 1; i++) {
                node = node.next;
            }
            if (node.next === this.last) {
                this.last = node;
            }
            // remove the node at the given index
            node.next = node.next.next;
        }
        this.length--;
    }
    get(index) {
        if (index < 0 || index >= this.length) {
            throw "index out of bounds";
        }
        let node = this.first;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        return node.element;
    }
    set(index, element) {
        if (index < 0 || index >= this.length) {
            throw "index out of bounds";
        }
        let node = this.first;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        node.element = element;
    }
    size() {
        return this.length;
    }
    [Symbol.iterator]() {
        let node = null; // is what next() 'has' returned
        let prev = null;
        let start = true;
        const myLinkedList = this;
        const iterator = {
            next: function () {
                const done = (node === null || node.next === null);
                let result = { "done": done };
                if (start) {
                    if (myLinkedList.first !== null) {
                        node = myLinkedList.first;
                        result = { "done": false, "value": node.element };
                    }
                    start = false;
                } else if (!done) {
                    result.value = node.next.element;
                    prev = node;
                    node = node.next;
                }
                return result;
            },
            insert: function (element) {
                let newNode = new Node(element);
                if (start) {
                    newNode.next = myLinkedList.first;
                    myLinkedList.first = newNode;
                    node = newNode;
                } else {
                    newNode.next = node.next;
                    node.next = newNode;
                }
                myLinkedList.length++;
            },
            remove: function () {
                if (start) {
                    throw "no node to remove before beginning of list!";
                }
                if (node === myLinkedList.first) {
                    myLinkedList.first = node.next;
                } else {
                    prev.next = node.next;
                }
                node = node.next;
                myLinkedList.length--;
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
    containsWithBinary(value) {
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
    contains(value) {
        let searchNode = this.first;
        do{
            if (searchNode.element == value){
                return true;
            }
            searchNode = searchNode.next;

        }while(searchNode.next)
        return false;
    }
} // end of LinkedList class
