// Uncomment the code below and write your tests

import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 100, b: 2, action: Action.Subtract, expected: 98 },
  { a: 30, b: 22, action: Action.Subtract, expected: 8 },
  { a: 73, b: 15, action: Action.Subtract, expected: 58 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 33, b: 21, action: Action.Multiply, expected: 693 },
  { a: 25, b: 21, action: Action.Multiply, expected: 525 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 48, b: 6, action: Action.Divide, expected: 8 },
  { a: 125, b: 5, action: Action.Divide, expected: 25 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 'aa', b: 2, action: Action.Add, expected: null },
  { a: 3, b: 'ff', action: Action.Subtract, expected: null },
  { a: 'uu', b: 2, action: Action.Multiply, expected: null },
  { a: 3, b: 'mmm', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests

  it.each(testCases)('blbla', (args) => {
    expect(
      simpleCalculator({ a: args.a, b: args.b, action: args.action }),
    ).toEqual(args.expected);
  });

  // Consider to use Jest table tests API to test all cases above
});
