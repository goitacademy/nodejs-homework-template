const { login } = require('./users');

describe('test status-code 200', () => {
  test('200 - true', async () => {
    const result = await login();
  });
});
