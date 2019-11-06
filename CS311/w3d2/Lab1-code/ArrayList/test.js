"use strict";
/* global describe */
/* global it */
/* global assert */
/* global beforeEach */
/* global FixedArray */
/* global ArrayList */


describe("FixedArray", function () {
    let fixedArray = new FixedArray(10);
    beforeEach(() => { fixedArray = new FixedArray(10); });

    describe("set() method", function () {
        it("can set the first element", function () {
            fixedArray.set(0, 5);
            assert.equal(fixedArray.get(0), 5);
        });
        it("can set the last element", function () {
            fixedArray.set(9, 6);
            assert.equal(fixedArray.get(9), 6);
        });
        it("can set an element in the middle", function () {
            fixedArray.set(5, 2);
            assert.equal(fixedArray.get(5), 2);
        });
    });

    describe("get() method", function () {
        it("can get the first element", function () {
            fixedArray.set(0, 5);
            assert.equal(fixedArray.get(0), 5);
        });
        it("can get the last element", function () {
            fixedArray.set(9, 6);
            assert.equal(fixedArray.get(9), 6);
        });
        it("can get an element in the middle", function () {
            fixedArray.set(5, 2);
            assert.equal(fixedArray.get(5), 2);
        });
    });
});


describe("ArrayList", function () {
    let arrayList = new ArrayList(10);
    beforeEach(() => { arrayList = new ArrayList(10); });

    describe("get() method", function () {
        it("can retrieve an element", function () {
            arrayList.add(1);
            assert.equal(arrayList.get(0), 1);
        });
    });
    describe("set() method", function () {
        it("can replace an element at an index", function () {
            arrayList.add(1);
            arrayList.set(0, 2);
            assert.equal(arrayList.get(0), 2);
            assert.equal(arrayList.length, 1);
        });
    });
    describe("add() method", function () {
        it("adds an element at the end", function () {
            arrayList.add(1);
            assert.equal(arrayList.length, 1);
            assert.equal(arrayList.get(0), 1);
        });
        it("increases capacity when needed", function () {
            for (let i = 0; i < 11; i++) {
                arrayList.add(i);
            }
            assert.equal(arrayList.capacity, 30);
            assert.equal(arrayList.get(10), 10);
        });
    });
    describe("insert() method", function () {
        it("can insert at the start of a list", function () {
            arrayList.insert(0, 5);
            assert.equal(arrayList.get(0), 5);
        });
        it("can insert at the end of a list", function () {
            arrayList.insert(0, 5);
            arrayList.insert(1, 7);
            assert.equal(arrayList.get(1), 7);
        });
        it("can inserts an element between others (shifting others right)", function () {
            arrayList.insert(0, 5);
            arrayList.insert(1, 7);
            arrayList.insert(1, 3);
            assert.equal(arrayList.get(1), 3);
            assert.equal(arrayList.get(2), 7);
        });
        it("can increases capacity when needed", function () {
            for (let i = 0; i < 11; i++) {
                arrayList.insert(0, i);
            }
            assert.equal(arrayList.capacity, 30);
            assert.equal(arrayList.length, 11);
        });
    });
    describe("remove() method", function () {
        it("can remove an element at an index (shifting remaining left)", function () {
            arrayList.add(1);
            arrayList.add(2);
            arrayList.add(3);
            arrayList.remove(1);
            assert.equal(arrayList.length, 2);
            assert.equal(arrayList.get(0), 1);
            assert.equal(arrayList.get(1), 3);
        });
    });
    describe("[Symbol.iterator]() method", function () {
        it("returns an iterator object", function () {
            const iterator = arrayList[Symbol.iterator]();
            assert.equal(typeof iterator.next, "function");
        });
        it("can be used by for of", function () {
            arrayList.add(4);
            arrayList.add(4);
            arrayList.add(4);
            let count = 0;
            for (const e of arrayList) {
                count++;
                assert.equal(e, 4);
            }
            assert.equal(count, 3);
        });
    });
    describe("iterator.next() method", function () {
        it("gives the next value", function () {
            arrayList.add(4);
            arrayList.add(5);
            arrayList.add(6);
            const iterator = arrayList[Symbol.iterator]();
            const firstObj = iterator.next();
            assert.equal(firstObj.value, 4);
            assert.equal(firstObj.done, false);
        });
        it("gives the last value", function () {
            arrayList.add(4);
            arrayList.add(5);
            arrayList.add(6);
            const iterator = arrayList[Symbol.iterator]();
            iterator.next();
            iterator.next();
            const lastObj = iterator.next();
            assert.equal(lastObj.value, 6);
            assert.equal(lastObj.done, false);

        });
        it("knows when it's done", function () {
            arrayList.add(4);
            arrayList.add(5);
            arrayList.add(6);
            const iterator = arrayList[Symbol.iterator]();
            iterator.next();
            iterator.next();
            iterator.next();
            const done = iterator.next();
            assert.equal(done.done, true);
        });
    });
    describe("sort() method", function() {
        it("sorts using the given comparison function", function() {
            arrayList.add(1);
            arrayList.add(5);
            arrayList.add(3);
            arrayList.sort((a,b)=> { return a - b });
            assert.equal(arrayList.get(0), 1);
            assert.equal(arrayList.get(1), 3);
            assert.equal(arrayList.get(2), 5);
        });
        it("sorts backwards with a different function", function() {
            arrayList.add(1);
            arrayList.add(5);
            arrayList.add(3);
            arrayList.sort((a,b)=> { return b - a });
            assert.equal(arrayList.get(0), 5);
            assert.equal(arrayList.get(1), 3);
            assert.equal(arrayList.get(2), 1);
        });
    });
    describe("contains() method",function() {
        it("searches for a value and returns -1 if not found", function(){
            arrayList.add("big");
            arrayList.add("small");
            arrayList.add("tall");
            arrayList.add("short");
            arrayList.add("round");
            arrayList.add("square");
            arrayList.add( "enormous");
            arrayList.add("tiny");
            arrayList.add("gargantuan");
            arrayList.add("lilliputian");
            arrayList.add("numberless");
            arrayList.add("none");
            arrayList.add("vast");
            arrayList.add("miniscule");
            arrayList.sort((a, b) => {
                if (a < b) { return -1; }
                else if (a > b) { return 1; }
                else { return 0; }
            });
            assert.equal(arrayList.contains("asdf"),-1);
        });
        it("searches for a value and returns the index of the item if found", function () {
            arrayList.add("big");
            arrayList.add("small");
            arrayList.add("tall");
            arrayList.add("short");
            arrayList.add("round");
            arrayList.add("square");
            arrayList.add("enormous");
            arrayList.add("tiny");
            arrayList.add("gargantuan");
            arrayList.add("lilliputian");
            arrayList.add("numberless");
            arrayList.add("none");
            arrayList.add("vast");
            arrayList.add("miniscule");
            console.log(arrayList.storage);
            arrayList.sort((a, b) => { 
                if (a < b) { return -1; }
                else if (a > b) { return 1; }
                else { return 0; } 
            });
            console.log(arrayList.storage);
            assert.equal(arrayList.contains("tiny"), 12);
        });
    });
    describe("containsRec() method", function () {
        it("searches for a value and returns -1 if not found", function () {
            arrayList.add("big");
            arrayList.add("small");
            arrayList.add("tall");
            arrayList.add("short");
            arrayList.add("round");
            arrayList.add("square");
            arrayList.add("enormous");
            arrayList.add("tiny");
            arrayList.add("gargantuan");
            arrayList.add("lilliputian");
            arrayList.add("numberless");
            arrayList.add("none");
            arrayList.add("vast");
            arrayList.add("miniscule");
            arrayList.sort((a, b) => {
                if (a < b) { return -1; }
                else if (a > b) { return 1; }
                else { return 0; }
            });
            assert.equal(arrayList.containsRec("asdf"), -1);
        });
        it("searches for a value and returns the index of the item if found", function () {
            arrayList.add("big");
            arrayList.add("small");
            arrayList.add("tall");
            arrayList.add("short");
            arrayList.add("round");
            arrayList.add("square");
            arrayList.add("enormous");
            arrayList.add("tiny");
            arrayList.add("gargantuan");
            arrayList.add("lilliputian");
            arrayList.add("numberless");
            arrayList.add("none");
            arrayList.add("vast");
            arrayList.add("miniscule");
            console.log(arrayList.storage);
            arrayList.sort((a, b) => {
                if (a < b) { return -1; }
                else if (a > b) { return 1; }
                else { return 0; }
            });
            console.log(arrayList.storage);
            assert.equal(arrayList.containsRec("tiny"), 12);
        });
    });
});

describe("Normal Array", function () {
    it("sorts based on character code point", function () {
        const a = [3, 2, 1, 9, 10, 20, 80];
        const sorted = a.sort();
        assert.equal(sorted[0], 1);
        assert.equal(sorted[5], 80);
        assert.equal(sorted[6], 9);
    });
    it("needs a comparison function to properly sort numbers", function () {
        const a = [3, 2, 1, 9, 10, 20, 80];
        const sorted = a.sort((a, b) => {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1
            }
            // a must be equal to b
            return 0;
        });
        assert.equal(sorted[0], 1);
        assert.equal(sorted[5], 20);
        assert.equal(sorted[6], 80);
    });
    it ("can take a quick and dirty comparison function", function() {
        const a = [3, 2, 1, 9, 10, 20, 80];
        const sorted = a.sort((a, b) => { return a - b });
        assert.equal(sorted[0], 1);
        assert.equal(sorted[5], 20);
        assert.equal(sorted[6], 80);
    
    });    
    it ("needs a function to compare Person objects", function() {
        const ppl = [
            {"firstName": "John", "lastName": "Brown", "age": 40}, 
            {"firstName": "Sally", "lastName": "Brown", "age": 38},
            {"firstName": "Nora", "lastName": "James", "age": 29},  
        ];
        const sorted = ppl.sort((a,b)=> {
            if (a.firstName < b.firstName) {
                return -1;
            } else if (a.firstName > b.firstName) {
                return 1;
            }
            return 0;
        });
        assert.equal(sorted[0].firstName, "John");
        assert.equal(sorted[1].firstName, "Nora");
        assert.equal(sorted[2].firstName, "Sally");
    });
});