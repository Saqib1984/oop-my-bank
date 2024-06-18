#! /usr/bin/env node
class BankAccount {
    accountNumber;
    accountHolder;
    balance;
    constructor(accountNumber, accountHolder, balance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited ${amount}. Now Your Current balance is ${this.balance}.`);
        }
        else {
            console.log("You entered invalid amount.");
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew ${amount}. Now Your Current balance is ${this.balance}.`);
        }
        else {
            console.log("You entered invalid amount.");
        }
    }
    getBalance() {
        return this.balance;
    }
    getAccountDetails() {
        console.log(`Account Number: ${this.accountNumber}`);
        console.log(`Account Holder: ${this.accountHolder}`);
        console.log(`Balance: ${this.balance}`);
    }
}
class SavingsAccount extends BankAccount {
    interestRate;
    constructor(accountNumber, accountHolder, balance = 0, interestRate = 0.02) {
        super(accountNumber, accountHolder, balance);
        this.interestRate = interestRate;
    }
    addInterest() {
        const interest = this.getBalance() * this.interestRate;
        this.deposit(interest);
        console.log(`Added interest ${interest}. Now Your Current Balance is ${this.getBalance()}.`);
    }
}
class CurrentAccount extends BankAccount {
    overdraftLimit;
    constructor(accountNumber, accountHolder, balance = 0, overdraftLimit = 1000) {
        super(accountNumber, accountHolder, balance);
        this.overdraftLimit = overdraftLimit;
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.getBalance() + this.overdraftLimit) {
            const newBalance = this.getBalance() - amount;
            if (newBalance < 0) {
                console.log(`Withdrawing ${amount}. Overdraft used.`);
            }
            else {
                console.log(`Withdrawing ${amount}.`);
            }
        }
        else {
            console.log("Withdraw amount exceeds overdraft limit.");
        }
    }
}
const profitAndLossAccount = new BankAccount("10000002345", "Saqib Samar", 40000);
profitAndLossAccount.getAccountDetails();
profitAndLossAccount.deposit(5000);
profitAndLossAccount.withdraw(3000);
profitAndLossAccount.getAccountDetails();
const savingsAccount = new SavingsAccount("20000007865", "Hassan Siddiqui", 5000, 0.02);
savingsAccount.getAccountDetails();
savingsAccount.deposit(500);
savingsAccount.addInterest();
savingsAccount.getAccountDetails();
const currentAccount = new CurrentAccount("10000009986", "Khadija Emaan", 1000, 1000);
currentAccount.getAccountDetails();
currentAccount.deposit(500);
currentAccount.withdraw(2000);
currentAccount.getAccountDetails();
export {};
