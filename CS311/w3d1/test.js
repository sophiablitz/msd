"use strict";
/* global describe */
/* global it */
/* global assert */
/* global SymbolBalancer */
let text = `
function sum(array) {
    let sum = 0;
    for (const num of array) {
        sum += num;
    }
    return sum;
}
function min(array) {
    if (array.length > 1) {
        let other = min(array.splice(1));
        if (other < array[0]) {
            return other;
        }   
    } 
    return array[0];
}
`;

let badText = `
function smallest(a, b) {
    if (a < b) {
        return a;
    else {
        return b;
    }
}
`;
let htmlText = `<!doctype html> <html> <head><title>stuff</title> </head> <body id="asdf" class='asdf'>asdfasdf</body></html>`
let badHtmlText1 = `<!doctype html> html> <head><title>stuff</title> </head> <body  id="asdf" class='asdf'>asdfasdf</body></html>`
let badHtmlText2 = `<!doctype html> <html> <head><title>stuff</title> </head> <body  id="asdf class='asdf'>asdfasdf</body></html>`
let badHtmlText3 = `<!doctype html> <html> <head><title>stuff</title> </head> <body  id="asdf" class=asdf'>asdfasdf</body></html>`


describe("SymbolBalancer", () => {
    let balancerA = undefined;
    let balancerB = undefined;
    let balancerC = undefined;
    let balancerD = undefined;
    let balancerE = undefined;
    let balancerF = undefined;
    describe("constructor", () => {
        it("takes a string containing the text of a program and returns a SymbolBalancer", () => {
            balancerA = new SymbolBalancer(text);
            balancerB = new SymbolBalancer(badText); 
            balancerC = new SymbolBalancer(htmlText);
            balancerD = new SymbolBalancer(badHtmlText1);
            balancerE = new SymbolBalancer(badHtmlText2);
            balancerF = new SymbolBalancer(badHtmlText3);
            assert.equal(balancerA.constructor, SymbolBalancer);
            assert.equal(balancerB.constructor, SymbolBalancer);
            assert.equal(balancerC.constructor, SymbolBalancer);
            assert.equal(balancerD.constructor, SymbolBalancer);
            assert.equal(balancerE.constructor, SymbolBalancer);
            assert.equal(balancerF.constructor, SymbolBalancer);
        });
    });
    describe("isBalanced(delimiters)", () => {
        it("takes a string with delimiters and returns true if the text has these delimiters balanced", () => {
            assert.isTrue(balancerA.isBalanced("{}[]()"));
            assert.isFalse(balancerB.isBalanced("{}[]()"));
        });
    });
    describe("isBalanced(delimiters)", () => {
        it("takes a string with HTML delimiters and returns true if the text has these delimiters balanced", () => {
            assert.isTrue(balancerC.isBalanced(`<>""''`));
            assert.isFalse(balancerD.isBalanced(`<>""''`));
            assert.isFalse(balancerE.isBalanced(`<>""''`));
            assert.isFalse(balancerF.isBalanced(`<>""''`));
        });
    });
});