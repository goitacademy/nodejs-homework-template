const { main } = require('./main');

test.skip('for array which el > 1', () => {
  expect([1, 5, 2, 0, -2]).toBe(5);
});
