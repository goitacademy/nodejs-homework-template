const { sum } = require('./sum');

const result = sum(1, 2);
if (result !== 3) {
  throw new Error(`Expect 3, got ${result}`);
}
console.log('OK');

const result2 = sum(1, -2);
if (result2 !== -1) {
  throw new Error(`Expect -1, got ${result}`);
}
console.log('OK');

const result3 = sum('1', -2);
if (result3 !== -1) {
  throw new Error(`Expect -1, got ${result3}`);
}
console.log('OK');

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expect ${expected}, got ${actual}`);
      }
    },
  };
}
