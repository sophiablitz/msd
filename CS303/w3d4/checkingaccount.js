"use strict";
/* global Account */
/**
 * Account with overdraft limit
 *
 * @class CheckingAccount
 * @extends {Account}
 */
class CheckingAccount extends Account {

  /**
   *Creates an instance of CheckingAccount.
   * @param {number} number the bank account number for the account
   * @param {number} overdraftLimit the minimum balance permitted for the checking account (negative number)
   * @memberof CheckingAccount
   */
  constructor(number, overdraftLimit) {
    super(number);
    this.overdraftLimit = overdraftLimit;
  }
  /**
   *
   *
   * @returns {number} the set overdraft limit on the account
   * @memberof CheckingAccount
   */
  getOverdraftLimit() {
    return this.overdraftLimit;
  }
  /**
   *
   *
   * @param {number} overdraftLimit the minimum balance permitted for the checking account (negative number)
   * @returns {undefined}
   * @memberof CheckingAccount
   */
  setOverdraftLimit(overdraftLimit) {
    this.overdraftLimit = overdraftLimit;
  }
  
  /**
  * Method to take money out of the account
  * 
  * @param {number} amount money to be taken out of the account
  * @returns {undefined}
  * @throws {RangeError} when amount is less than or equal to zero
  * @throws {Error} when the account has insufficient funds (balance)
  */
  withdraw(amount) {
    if (amount <= 0) {
      throw new RangeError("Withdraw amount has to be greater than zero");
    }
    if (amount + this.overdraftLimit > this._balance) {
      throw Error("Insufficient funds");
    }
    this._balance -= amount;
  }

  /**
   * check if the balance is below zero, and if so return a string with a warning, else, an empty string
   *
   * @returns {string} warning if balance is below zero, else, empty string
   * @memberof CheckingAccount
   */
  endOfMonth(){
    return this.getBalance() < 0 ? "Warning, low balance " + this.toString() : "";
  }
  /**
   *
   *
   * @returns {string} Message with account information including overdraft limit.
   * @memberof CheckingAccount
   */
  toString() {
    return super.toString() + ": overdraft limit " + this.overdraftLimit;
  }
}