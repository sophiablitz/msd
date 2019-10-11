/** Next create a Bank class, 
 * a Bank object should have 
 *    an array of Account objects
 *    methods: 
 *      addAccount() returns the number of the created account
 *      addSavingsAccount(interest) returns the number of the created account
 *      addCheckingAccount(overdraft)  returns the number of the created account
 *      closeAccount(number) closes (removes from the array) the account with that number, 
 *      accountReport() method that returns a String with each account on its own line. 
 *      endOfMonth() go through the array calling endOfMonth() on each of the accounts collecting their output
 *    Use a static nextNumber variable on the Bank class to know what the number for the next account will be. 
 *    Create Mocha / Chai tests to ensure that everything is working 
 * 
 * */
"use strict";
/* global Account, SavingsAccount, CheckingAccount */
/**
 * Bank object that can create, manage, and remove Accounts, SavingsAccounts, and CheckingAccounts
 *
 * @class Bank
 */
class Bank {
  /**
   * Creates an instance of Bank.
   * @memberof Bank
   */
  constructor() {
    this.accounts = [];
    this.nextNumber = 1;
  }
  /**
   * Create a new account.
   *
   * @returns {number} the created account number
   * @memberof Bank
   */
  addAccount() {
    this.accounts.push(new Account(this.nextNumber));

    return this.nextNumber++;
  }
  /**
   * Create a new savings account with a specified interest rate.
   *
   * @param {number} interest the interest rate for the savings account
   * @returns {number} the created account number
   * @memberof Bank
   */
  addSavingsAccount(interest) {
    this.accounts.push(new SavingsAccount(this.nextNumber, interest));

    return this.nextNumber++;

  }
  /**
   * Create a new checking account with a specified overdraft limit.
   *
   * @param {number} overdraft the overdraft limit for the checking account.
   * @returns {number} the created account number
   * @memberof Bank
   */
  addCheckingAccount(overdraft) {
    this.accounts.push(new CheckingAccount(this.nextNumber, overdraft));

    return this.nextNumber++;

  }
  /**
   * Close an account with a specified account number
   *
   * @param {number} number Account number of account to be closed
   * @returns {undefined}
   * @memberof Bank
   */
  closeAccount(number) {

    let index = this.accounts.findIndex((act) => act.getNumber() == number);
    this.accounts.splice(index, 1);

  }
  /**
   * Report all accounts in the bank.
   * 
   * @returns {string} List of all accounts and their details.
   * @memberof Bank
   */
  accountReport() {
    let message = "";
    this.accounts.forEach(act => { message += act.toString() + "\n"; });
    return message;
  }

  /**
   * Runs end of month method for all accounts in the bank
   * 
   * @returns {string} End of month report of all accounts.
   * @memberof Bank
   */
  endOfMonth() {
    let message = "";
    this.accounts.forEach((act) => { 
      if (act.endOfMonth().length >0 ){
        message += act.endOfMonth() + "\n"; 
      }
    });
    return message;
  }
}
