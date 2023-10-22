
import { describe, expect, test } from 'vitest'
import { Bank, BankManager, Customer } from './'

describe('Bank Test Suite', () => {
    test('Create a bank with initial empty balance.', () => {
        const bank = new Bank()
        expect.assertions(2)
        expect(bank).instanceOf(Bank)
        expect(bank.getBalance()).toBe(0)
    })

    test('Bank should maintain a balance for multiple customers.', () => {
        const bank = new Bank()

        const NeoInitialBalance = 100
        const Neo = new Customer('Neo', NeoInitialBalance)

        const MorpheusInitialBalance = 200
        const Morpheus = new Customer('Morpheus', MorpheusInitialBalance)

        bank.newCustomer(Neo)
        bank.newCustomer(Morpheus)

        expect.assertions(2)
        expect(bank.getCustomers()).toHaveLength(2)
        expect(bank.getBalance()).toBe(NeoInitialBalance + MorpheusInitialBalance)
    })

    test('Bank manager should be able to see the total bank\'s balance.', () => {
        const initialBankBalance = 200
        const bank = new Bank(initialBankBalance)
        const bankManager = new BankManager(bank)

        expect(bankManager.checkBankBalance()).toBe(bank.getBalance())
    })

    test('Customer should be able to deposit.', () => {
        const bank = new Bank()

        const NeoInitialBalance = 100
        const Neo = new Customer('Neo', NeoInitialBalance)

        bank.newCustomer(Neo)

        const NeoDepositAmount = 400
        Neo.deposit(NeoDepositAmount)

        expect(bank.getBalance()).toBe(NeoInitialBalance + NeoDepositAmount)
    })

    test('Customer should be able to withdraw.', () => {
        const bank = new Bank()

        const NeoInitialBalance = 500
        const Neo = new Customer('Neo', NeoInitialBalance)

        bank.newCustomer(Neo)

        const NeoWithdrawAmount = 400
        Neo.withdraw(NeoWithdrawAmount)

        let updatedBankBalance = NeoInitialBalance - NeoWithdrawAmount
        expect(bank.getBalance()).toBe(updatedBankBalance)
    })

    test('Error should be thrown if withdrawn amount is greater than current balance.', () => {
        const bank = new Bank()

        const NeoInitialBalance = 100
        const Neo = new Customer('Neo', NeoInitialBalance)

        bank.newCustomer(Neo)

        const NeoWithdrawAmount = 101

        let withDrawFn = () => Neo.withdraw(NeoWithdrawAmount)

        expect(withDrawFn).toThrow('Insufficient')
    })

    test('Customer sould be able to check their current balances.', () => {
        const bank = new Bank()

        const NeoInitialBalance = 100
        const Neo = new Customer('Neo', NeoInitialBalance)
        bank.newCustomer(Neo)

        expect(Neo.getBalance()).toBe(NeoInitialBalance)
    })


    test('Customer should be able to transfer money to another customer.', () => {
        const bank = new Bank()

        const TrinityInitialBalance = 300
        const Trinity = new Customer('Trinity', TrinityInitialBalance)

        const NeoInitialBalance = 100
        const Neo = new Customer('Neo', NeoInitialBalance)

        bank.newCustomer(Trinity)
        bank.newCustomer(Neo)

        const transferAmount = 150
        Trinity.transfer(bank, Neo.getAccountNumber(), transferAmount)

        const updatedTrinityBalance = TrinityInitialBalance - transferAmount
        const updatedNeoBalance = NeoInitialBalance + transferAmount

        expect.assertions(2)
        expect(Trinity.getBalance()).toBe(updatedTrinityBalance)
        expect(Neo.getBalance()).toBe(updatedNeoBalance)
    })

    test('Throw error if transfer amount is greater than current balance.', () => {
        const bank = new Bank()

        const Trinity = new Customer('Trinity', 300)
        const Neo = new Customer('Neo', 100)

        bank.newCustomer(Trinity)
        bank.newCustomer(Neo)

        const transferFn = () => Trinity.transfer(bank, Neo.getAccountNumber(), 301)

        expect(transferFn).toThrow()
    })


    test('Throw error if transfer to user\s account does not exists.', () => {
        const bank = new Bank()

        const Trinity = new Customer('Trinity', 100)

        bank.newCustomer(Trinity)

        const notExistingUserId = 'user-id-xyz'
        const transferFn = () => Trinity.transfer(bank, notExistingUserId, 100)

        expect(transferFn).toThrow()
    })
})


