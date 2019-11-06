"use strict";
/* global Stack */

class SymbolBalancer {
    constructor(text) {
        this.text = text;
        this.stack = new Stack();
        this.openers = [];
        this.closers = [];
    }

    isBalanced(delimiters) {
        this.setOpenersAndClosers(delimiters);
        let textArray = this.text.split("");
        console.log(textArray);

        // for each character in code 
        for (let i = 0; i < textArray.length; i++) {

            // determine if character of text is an opener or closer
            let indexOfOpener = this.openers.indexOf(textArray[i]);
            let indexOfCloser = this.closers.indexOf(textArray[i]);
            // if character is both opener and closer
            if (indexOfOpener != -1 && indexOfOpener == indexOfCloser) {

                // if top of stack is opener, pop opener
                if (this.stack.peek() == this.openers[indexOfOpener]) {
                    this.stack.pop();
                    console.log(this.stack.storage);

                } else { // if top of stack is not opener, push opener
                    this.stack.push(this.openers[indexOfOpener]);
                    console.log(this.stack.storage);
                }
                
            } else if (indexOfOpener != -1) { // else if character is only opener 
                this.stack.push(this.openers[indexOfOpener]);
                console.log(this.stack.storage);

            } else if (indexOfCloser != -1) { // if character is a closer
                // check that top of stack is buddy
                if (this.stack.peek() == this.openers[indexOfCloser]) {
                    this.stack.pop();
                    console.log(this.stack.storage);
                }
                else {
                    console.log('leaving');
                    console.log(this.stack.storage);
                    return false;
                }
            }

            // if character is opener, push opener
            else if (indexOfOpener != -1) {
                this.stack.push(this.openers[indexOfOpener]);
                console.log(this.stack.storage);
            }
        }
        console.log("The stack has: " + this.stack.size())
        // if stack is empty, return true
        return (this.stack.size() == 0);
    }
    setOpenersAndClosers(delimiters) {
        for (let i = 0; i < delimiters.length; i++) {
            if (i % 2 == 0) {
                this.openers.push(delimiters[i]);
            }
            else {
                this.closers.push(delimiters[i]);
            }
        }
        // console.log("Openers: ");
        // console.log(this.openers);
        // console.log("Closers: ");
        // console.log(this.closers);
    }
}