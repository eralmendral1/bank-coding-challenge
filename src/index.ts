export class Bank {
    private customers: any[] = []
    private balance: number = 0

    constructor(initialBalance: number = 0) {
        this.balance = initialBalance
    }

    getBalance(): number {
        let totalBalance: number = 0
        this.customers.forEach(customer => {
            totalBalance += customer.getBalance()
        })

        return totalBalance
    }

    displayBalance() : void {
        console.log(`Bank Total Balance: ${this.getBalance()}`)
    }

    newCustomer(customer: Customer): void {
        this.customers = [...this.customers, customer]
    }

    getCustomer(accountNumber: string): any {
        return this.customers.find((customer: Customer) => customer.getAccountNumber() === accountNumber)
    }

    getCustomers(): Customer[] {
        return this.customers
    }
}

export class BankManager {
    private bank: Bank
    constructor(bank: Bank) {
        this.bank = bank
    }

    checkBankBalance(): number {
        return this.bank.getBalance()
    }
}

export class Customer {
    private accountNumber: string
    private name: string
    private balance: number

    constructor(name: string, balance: number) {
        this.accountNumber = String(Math.random())
        this.name = name
        this.balance = balance
    }

    getAccountNumber(): string {
        return this.accountNumber
    }

    getBalance(): number {
        return this.balance
    }

    displayBalance(): void {
        console.log(`Current Balance:`, this.balance)
    }

    withdraw(amount: number): number {
        if (amount > this.balance) {
            throw new Error('Insufficient funds.')
        }

        this.balance -= amount

        console.log(`Successfully withdrawn ${amount}`)

        return amount
    }

    deposit(amount: number): void {
        this.balance += amount
        console.log(`Successfully deposited: ${amount}`)
    }

    receive(amount: number): void {
        this.balance += amount
        console.log(`Successfully received: ${amount}`)
    }

    transfer(bank: Bank, accountNumber: string, amount: number): void {
        if (amount > this.balance) {
            throw new Error('Insufficient funds.')
        }

        const customerTo = bank.getCustomer(accountNumber)

        if (!customerTo) {
            throw new Error('User not found.')
        }

        customerTo.receive(amount)
        this.balance -= amount
        console.log(`Transfered ${amount} to ${accountNumber}.`)
    }
}


const bank = new Bank()
const bankManager = new BankManager(bank)

const peter = new Customer('Peter', 100)
const jane = new Customer('Jane', 200)

bank.newCustomer(peter)
bank.newCustomer(jane)

peter.withdraw(20)
peter.deposit(100)

peter.transfer(bank, jane.getAccountNumber(), 150)
jane.displayBalance()

console.log(bankManager.checkBankBalance())
