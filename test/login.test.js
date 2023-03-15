const login = require('../controllers/users/loginUser');

test('http 200', () => {
  let req = {
    body: {
        email: 'test@test.com',
        password: 'test'
    }
  }
  expect(login.loginUser(req, {})).toBe(3);
});

test('http 401', () => {
    let req = {
      body: {
          email: 'test@test.com'
      }
    }
    expect(login.loginUser(req, {})).toBe(4);
  });