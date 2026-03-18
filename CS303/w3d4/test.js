"use strict";
/* global assert Account SavingsAccount CheckingAccount Bank*/
describe("Account",function () {
  let act = new Account(12345);
  it("toString returns account info: Account 12345: balance 0", function (){
    assert.equal(act.toString(), "Account 12345: balance 0");
  });

  it("getNumber returns account number: 12345", function () {
    assert.equal(act.getNumber(), 12345);
  });
  it("getBalance returns account balance: 0", function () {
    assert.equal(act.getBalance(), 0);
  });
  it("deposit() increases balance", function () {

    act.deposit(5);
    assert.equal(act.getBalance(), 5);
  });
  it("withdraw() increases balance", function () {

    act.withdraw(3);
    assert.equal(act.getBalance(), 2);
  });
  it("withdraw() prohibits overdraft beyond limit", function () {
    assert.throws(() => { act.withdraw(20); }, "Insufficient funds");
  });
  it("endOfMonth() prints nothing", function () {
    assert.equal(act.endOfMonth(),"");
  });
});

describe("SavingsAccount", function () {
  let sav = new SavingsAccount(123,2.5);
  it("toString returns account info: Account 123: balance 0: interest 2.5", function () {
    assert.equal(sav.toString(), "Account 123: balance 0: interest 2.5");
  });
  it("getInterest() returns the current interest rate: 2.5", function () {

    assert.equal(sav.getInterest(), 2.5);
  });
  it("setInterest() updates the current interest rate: 2", function () {
    sav.setInterest(2);
    assert.equal(sav.getInterest(), 2);
  });

  it("addInterest() adds interest to balance: 100 + 2 = 102", function () {
    sav.deposit(100);
    sav.addInterest();
    assert.equal(sav.getBalance(), 102);
  });
  it("endOfMonth() returns interest added", function () {
    sav.withdraw(2); // return blance to 100 before adding interest.
    assert.equal(sav.endOfMonth(), "Interest added Account 123: balance 102: interest 2");
  });
});

describe("CheckingAccount", function () {
  let check = new CheckingAccount(12, -10);
  it("toString returns account info: Account 12: balance 0: overdraft limit -10", function () {
    assert.equal(check.toString(), "Account 12: balance 0: overdraft limit -10");
  });
  describe("overdraft limit", function () {
    it("getOverdraftLimit() returns the current overdraft limit: -10", function () {

      assert.equal(check.getOverdraftLimit(), -10);
    });
    it("setOverdraftLimit() updates the current interest rate: 2", function () {
      check.setOverdraftLimit(-5);
      assert.equal(check.getOverdraftLimit(), -5);
    });
  });
  describe("withdraw()", function () {
    it("allows withdrawals within limit", function () {
      check.deposit(100);
      check.withdraw(95);
      assert.equal(check.getBalance(), 5);
    });
    it("prohibits overdraft beyond limit", function () {
      assert.throws(()=>{check.withdraw(20);}, "Insufficient funds");
    });
  });

  describe("endOfMonth()", function () {
    it("returns warning for negative balance", function () {
      check.withdraw(6); // set balance to negative before calling end of month interest.
      assert.equal(check.endOfMonth(), "Warning, low balance Account 12: balance -1: overdraft limit -5");
    });
    it("returns empty string for positive balance", function () {
      check.deposit(10); // set balance to negative before calling end of month interest.
      assert.equal(check.endOfMonth(), "");
    });
  });
});

describe("Bank", function () {

  let bank = new Bank();
  describe("accountReport()", function () {
    it("returns all account info.", function () {

      bank.addAccount();
      bank.addCheckingAccount(-10);
      bank.addSavingsAccount(3);
      const output = "Account 1: balance 0\nAccount 2: balance 0: overdraft limit -10\nAccount 3: balance 0: interest 3\n";
      assert.equal(bank.accountReport(), output);
    });
  });
  describe("addAccount()", function () {
    it("returns the account number", function () {
      assert.equal(bank.addAccount(), 4);
    });
    it("adds an account to the bank array", function () {
      const before = bank.accounts.length;
      bank.addAccount();
      const after = bank.accounts.length;
      assert.equal(after, before + 1);
    });
  });
  describe("addSavingsAccount()", function () {
    it("returns the account number", function () {
      assert.equal(bank.addSavingsAccount(3), 6);
    });
    it("adds an account to the bank array", function () {
      const before = bank.accounts.length;
      bank.addSavingsAccount(4);
      const after = bank.accounts.length;
      assert.equal(after, before + 1);
    });
  });
  describe("addCheckingAccount()", function (){
    it("returns the account number", function () {
      assert.equal(bank.addCheckingAccount(-100), 8 );
    });
    it("adds an account to the bank array", function () {
      const before = bank.accounts.length;
      bank.addCheckingAccount();
      const after = bank.accounts.length;
      assert.equal(after, before + 1);
    });
  });

  describe("closeAccount()", function () {
    it("removes a specified account", function () {
      const before = bank.accountReport();
      let actNum = bank.addAccount();
      bank.closeAccount(actNum);
      const after = bank.accountReport();
      assert.equal(before, after);
    });
  });
  describe("endOfMonth()", function (){
    it("returns end of month report for all accounts", function (){
      let result = bank.endOfMonth();
      console.log(result);
      assert.equal(result,"Interest added Account 3: balance 0: interest 3\n" +
      "Interest added Account 6: balance 0: interest 3\n" +
      "Interest added Account 7: balance 0: interest 4\n");
    });
  });
});