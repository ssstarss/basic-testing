// Uncomment the code below and write your tests
import { get } from 'lodash';
import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const testBankAccaunt = getBankAccount(1000);
    expect(get(testBankAccaunt, '_balance')).toEqual(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const testBankAccaunt = getBankAccount(1000);
    expect(() => testBankAccaunt.withdraw(1100)).toThrow(
      `Insufficient funds: cannot withdraw more than ${1000}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const testBankAccaunt = getBankAccount(1000);
    const newBankAccaunt = getBankAccount(500);
    expect(() => testBankAccaunt.transfer(1100, newBankAccaunt)).toThrow(
      `Insufficient funds: cannot withdraw more than ${1000}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const testBankAccaunt = getBankAccount(1000);
    expect(() => testBankAccaunt.transfer(1100, testBankAccaunt)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const testBankAccaunt = getBankAccount(1000);
    testBankAccaunt.deposit(500);
    expect(get(testBankAccaunt, '_balance')).toEqual(1500);
  });

  test('should withdraw money', () => {
    const testBankAccaunt = getBankAccount(1000);
    testBankAccaunt.withdraw(500);
    expect(get(testBankAccaunt, '_balance')).toEqual(500);
  });

  test('should transfer money', () => {
    const testBankAccaunt = getBankAccount(1000);
    const newBankAccaunt = getBankAccount(1000);
    testBankAccaunt.transfer(200, newBankAccaunt);
    expect(get(testBankAccaunt, '_balance')).toEqual(800);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const testBankAccaunt = getBankAccount(1000);
    const mockedBalance = jest.spyOn(testBankAccaunt, 'fetchBalance');
    mockedBalance.mockResolvedValue(100);
    const balance = await testBankAccaunt.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const testBankAccaunt = getBankAccount(1000);
    const mockedFetchBalance = jest.spyOn(testBankAccaunt, 'fetchBalance');
    mockedFetchBalance.mockResolvedValue(100);
    await testBankAccaunt.synchronizeBalance();
    expect(testBankAccaunt.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const testBankAccaunt = getBankAccount(500);
    const mockedBalance = jest.spyOn(testBankAccaunt, 'fetchBalance');
    mockedBalance.mockResolvedValue(null);
    await expect(testBankAccaunt.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
