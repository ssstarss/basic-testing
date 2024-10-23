// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 6, action: Action.Add })).toEqual(11);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 15, b: 6, action: Action.Subtract })).toEqual(
      9,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 6, action: Action.Multiply })).toEqual(
      30,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 16, b: 8, action: Action.Divide })).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate }),
    ).toEqual(8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 6, action: 'minus' })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'yyy', b: 6, action: Action.Add })).toEqual(
      null,
    );
    expect(simpleCalculator({ a: 5, b: 'aaaa', action: Action.Add })).toEqual(
      null,
    );
  });
});
