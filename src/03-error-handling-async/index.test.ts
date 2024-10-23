// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  // MyAwesomeError,
  rejectCustomError,
  MyAwesomeError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(15);
    expect(result).toEqual(15);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('Provided Message')).toThrow('Provided Message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    try {
      await rejectCustomError();
    } catch (e) {
      if (e instanceof MyAwesomeError)
        expect(e.message).toEqual('This is my awesome custom error!');
    }
  });
});
