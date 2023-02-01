const { sum } = require('./sum');

test('add 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe.skip('sum ', () => {
  beforeEach(() => {
    console.log("I'm running before each test");
  });
  beforeAll(() => {
    console.log("I'm running before all tests");
  });
  afterEach(() => {
    console.log("I'm running after all tests");
  });
  // test.skip: skip only this test
  test.skip('add 1 + 2 to equal 3', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
  // test.only: run only this test
  test.only('add 2 + 3 to equal 5', () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
  });
  // it === test
  it('add 1 + -3 to equal -2', () => {
    const result = sum(1, -3);
    expect(result).toBe(-2);
  });
});
