"use strict";
/* global describe */
/* global it */
/* global assert */
/* global Employee */
/* global nameComparator */

describe("nameComparator", function () {
    it("Compares Employees by name in a list", function () {
        let employees = [
            new Employee("George", 40000, 1996, 11, 5),
            new Employee("Dave", 50000, 2000, 1, 3),
            new Employee("Richard", 45000, 2001, 2, 7)];
        employees.sort(nameComparator);
        assert.equal(employees[0].name, "Dave");
        assert.equal(employees[1].name, "George");
        assert.equal(employees[2].name, "Richard");
    });
    it("Compares Employees by name in a LinkedList", function () {
        let linkedList = new LinkedList();
        linkedList.add(new Employee("George", 40000, 1996, 11, 5));
        linkedList.add(new Employee("Dave", 50000, 2000, 1, 3));
        linkedList.add(new Employee("Richard", 45000, 2001, 2, 7));
        linkedList.sort(nameComparator);
        assert.equal(linkedList.get(0).name, "Dave");
        assert.equal(linkedList.get(1).name, "George");
        assert.equal(linkedList.get(2).name, "Richard");
    });
    it("Compares Employees by name in an ArrayList", function () {
        let arrayList = new ArrayList(4);
        arrayList.add(new Employee("George", 40000, 1996, 11, 5));
        arrayList.add(new Employee("Dave", 50000, 2000, 1, 3));
        arrayList.add(new Employee("Richard", 45000, 2001, 2, 7));
        arrayList.sort(nameComparator);
        assert.equal(arrayList.get(0).name, "Dave");
        assert.equal(arrayList.get(1).name, "George");
        assert.equal(arrayList.get(2).name, "Richard");
    });
});

describe("salaryComparator", function () {
    it("Compares Employees by salary in a list", function () {
        let employees = [
            new Employee("George", 40000, 1996, 11, 5),
            new Employee("Dave", 50000, 2000, 1, 3),
            new Employee("Richard", 45000, 2001, 2, 7)];
        employees.sort(salaryComparator);
        assert.equal(employees[0].salary, 40000);
        assert.equal(employees[1].salary, 45000);
        assert.equal(employees[2].salary, 50000);
    });
    it("Compares Employees by salary in a LinkedList", function () {
        let linkedList = new LinkedList();
        linkedList.add(new Employee("George", 40000, 1996, 11, 5));
        linkedList.add(new Employee("Dave", 50000, 2000, 1, 3));
        linkedList.add(new Employee("Richard", 45000, 2001, 2, 7));
        linkedList.sort(salaryComparator);
        assert.equal(linkedList.get(0).name, "George");
        assert.equal(linkedList.get(1).name, "Richard");
        assert.equal(linkedList.get(2).name, "Dave");
    });
    it("Compares Employees by salary in an ArrayList", function () {
        let arrayList = new ArrayList(4);
        arrayList.add(new Employee("George", 40000, 1996, 11, 5));
        arrayList.add(new Employee("Dave", 50000, 2000, 1, 3));
        arrayList.add(new Employee("Richard", 45000, 2001, 2, 7));
        arrayList.sort(salaryComparator);
        assert.equal(arrayList.get(0).name, "George");
        assert.equal(arrayList.get(1).name, "Richard");
        assert.equal(arrayList.get(2).name, "Dave");
    });
});

describe("hireDateComparator", function () {
    it("Compares Employees by hire date in a list", function () {
        let employees = [
            new Employee("George", 40000, 1996, 11, 5),
            new Employee("Richard", 45000, 2001, 2, 7),
            new Employee("Dave", 50000, 2000, 1, 3)];
        employees.sort(hireDateComparator);
        assert.equal(employees[0].name, "George");
        assert.equal(employees[1].name, "Dave");
        assert.equal(employees[2].name, "Richard");
    });
    it("Compares Employees by hire date in a LinkedList", function () {
        let linkedList = new LinkedList();
        linkedList.add(new Employee("Dave", 50000, 2000, 1, 3));
        linkedList.add(new Employee("Richard", 45000, 2001, 2, 7));
        linkedList.add(new Employee("George", 40000, 1996, 11, 5));
        linkedList.sort(hireDateComparator);
        assert.equal(linkedList.get(0).name, "George");
        assert.equal(linkedList.get(1).name, "Dave");
        assert.equal(linkedList.get(2).name, "Richard");
    });
    it("Compares Employees by hire date in an ArrayList", function () {
        let arrayList = new ArrayList(4);
        arrayList.add(new Employee("George", 40000, 1996, 11, 5));
        arrayList.add(new Employee("Dave", 50000, 2000, 1, 3));
        arrayList.add(new Employee("Richard", 45000, 2001, 2, 7));
        arrayList.sort(hireDateComparator);
        assert.equal(arrayList.get(0).name, "George");
        assert.equal(arrayList.get(1).name, "Dave");
        assert.equal(arrayList.get(2).name, "Richard");
    });
});