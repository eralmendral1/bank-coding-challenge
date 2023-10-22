var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define("index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Customer = exports.BankManager = exports.Bank = void 0;
    var Bank = /** @class */ (function () {
        function Bank(initialBalance) {
            if (initialBalance === void 0) { initialBalance = 0; }
            this.customers = [];
            this.balance = 0;
            this.balance = initialBalance;
        }
        Bank.prototype.getBalance = function () {
            var totalBalance = 0;
            this.customers.forEach(function (customer) {
                totalBalance += customer.getBalance();
            });
            return totalBalance;
        };
        Bank.prototype.displayBalance = function () {
            console.log("Bank Total Balance: ".concat(this.getBalance()));
        };
        Bank.prototype.newCustomer = function (customer) {
            this.customers = __spreadArray(__spreadArray([], this.customers, true), [customer], false);
        };
        Bank.prototype.getCustomer = function (accountNumber) {
            return this.customers.find(function (customer) { return customer.getAccountNumber() === accountNumber; });
        };
        Bank.prototype.getCustomers = function () {
            return this.customers;
        };
        return Bank;
    }());
    exports.Bank = Bank;
    var BankManager = /** @class */ (function () {
        function BankManager(bank) {
            this.bank = bank;
        }
        BankManager.prototype.checkBankBalance = function () {
            return this.bank.getBalance();
        };
        return BankManager;
    }());
    exports.BankManager = BankManager;
    var Customer = /** @class */ (function () {
        function Customer(name, balance) {
            this.accountNumber = String(Math.random());
            this.name = name;
            this.balance = balance;
        }
        Customer.prototype.getAccountNumber = function () {
            return this.accountNumber;
        };
        Customer.prototype.getBalance = function () {
            return this.balance;
        };
        Customer.prototype.displayBalance = function () {
            console.log("Current Balance:", this.balance);
        };
        Customer.prototype.withdraw = function (amount) {
            if (amount > this.balance) {
                throw new Error('Insufficient funds.');
            }
            this.balance -= amount;
            console.log("Successfully withdrawn ".concat(amount));
            return amount;
        };
        Customer.prototype.deposit = function (amount) {
            this.balance += amount;
            console.log("Successfully deposited: ".concat(amount));
        };
        Customer.prototype.receive = function (amount) {
            this.balance += amount;
            console.log("Successfully received: ".concat(amount));
        };
        Customer.prototype.transfer = function (bank, accountNumber, amount) {
            if (amount > this.balance) {
                throw new Error('Insufficient funds.');
            }
            var customerTo = bank.getCustomer(accountNumber);
            if (!customerTo) {
                throw new Error('User not found.');
            }
            customerTo.receive(amount);
            this.balance -= amount;
            console.log("Transfered ".concat(amount, " to ").concat(accountNumber, "."));
        };
        return Customer;
    }());
    exports.Customer = Customer;
    var bank = new Bank();
    var bankManager = new BankManager(bank);
    var peter = new Customer('Peter', 100);
    var jane = new Customer('Jane', 200);
    bank.newCustomer(peter);
    bank.newCustomer(jane);
    peter.withdraw(20);
    peter.deposit(100);
    peter.transfer(bank, jane.getAccountNumber(), 150);
    jane.displayBalance();
    console.log(bankManager.checkBankBalance());
});
