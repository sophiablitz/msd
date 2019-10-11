"use strict";
/* global Account */
/**
 *
 *
 * @class SavingsAccount
 * @extends {Account}
 */
class SavingsAccount extends Account {

  /**
   *Creates an instance of SavingsAccount.
   * @param {number} number the bank account number for the account
   * @param {number} interest the interest rate for this account
   * @memberof SavingsAccount
   */
  constructor(number, interest) {
    super(number);
    this.interest = interest;
  }
  /**
   *
   *
   * @returns {number} the interest rate on this account
   * @memberof SavingsAccount
   */
  getInterest() {
    return this.interest;
  }
  /**
   *
   * 
   * @param {number} interest the interest rate for the account
   * @returns {undefined}
   * @throws {RangeError} when interest is less than zero
   * @memberof SavingsAccount
   */
  setInterest(interest) {
    if (interest < 0) {
      throw new RangeError("Interest rate has to be greater than or equal to zero");
    } else{
      this.interest = interest;
    }
  }
  /**
   * 
   * @returns {undefined}
   * @memberof SavingsAccount
   */
  addInterest() {
    try {
      this.deposit(this.getBalance() * this.interest / 100);
    }
    catch (err) {
      console.log("No interest added. Balance = 0.");
    }
    
  }


  /**
   * Adds interest to account and returns statement.
   *
   * @returns {string} account report that interest was added
   * @memberof SavingsAccount
   */
  endOfMonth(){
    this.addInterest();
    return "Interest added " + this.toString();
  }
  /**
   *
   *
   * @returns {string} Account summary with account number and interest rate
   * @memberof SavingsAccount
   */
  toString() {
    return super.toString() + ": interest " + this.interest;
  }
}