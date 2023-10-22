import { v4 as uuidv4 } from 'uuid'

export class Bank {

    constructor(initialBalance = 0) {
        this.customers = []
        this.balance = initialBalance
    }

    getBalance() {
        let totalBalance = 0
        this.customers.forEach(customer => {
            totalBalance += customer.getBalance()
        })

        console.log(`Bank balance: ${totalBalance}`)
        return totalBalance
    }

    newCustomer(customer) {
        this.customers = [...this.customers, customer]
    }

    getCustomer(accountNumber) {
        return this.customers.find(customer => customer.accountNumber === accountNumber)
    }
}

export class BankManager {
    constructor(bank) {
        this.bank = bank
    }

    checkBankBalance() {
        return this.bank.getBalance()
    }
}

export class Customer {
    constructor(name, balance) {
        this.accountNumber = uuidv4()
        this.name = name
        this.balance = balance
    }

    getAccountNumber() {
        return this.accountNumber
    }

    getBalance() {
        return this.balance
    }

    checkBalance() {
        console.log(`Your current balance is:`, this.balance)
        return this.balance
    }

    withdraw(amount) {
        if(amount > this.balance) {
            throw new Error('Insufficient funds.')
        }

        this.balance -= amount

        console.log(`Successfully withdrawn ${amount}`)

        return amount
    }

    deposit(amount) {
        this.balance += amount
        console.log(`Successfully deposited: ${amount}`)
    }

    receive(amount) {
        this.balance += amount
        console.log(`Successfully received: ${amount}`)
    }

    transfer(bank, accountNumber, amount) {
        if(amount > this.balance) {
            throw new Error('Insufficient funds.')
        }

        const customerTo = bank.getCustomer(accountNumber)
        
        if(!customerTo) {
            throw new Error('User not found.')
        }

        customerTo.receive(amount)
        this.balance -= amount
        console.log(`Transfered ${amount} to ${accountNumber}.`)
    }
}


const bank = new Bank()
const bankManager = new BankManager(bank);


const peter = new Customer('Peter', 100)
const jane = new Customer('Jane', 200)

bank.newCustomer(peter)
bank.newCustomer(jane)

peter.withdraw(20)
peter.deposit(100)

peter.transfer(bank, jane.getAccountNumber(), 150)
jane.checkBalance()

console.log(bankManager.checkBankBalance())
