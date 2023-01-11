/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { login } = require('../controllers/auth');
const { User } = require('../models');
require('dotenv').config();

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');
jest.mock('../models', () => ({
  User: {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('login', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password',
      },
    };

    res = {
      json: jest.fn(),
    };
  });

  it('should generate a token and return the token and user data', async () => {
    bcrypt.compare.mockReturnValue(true);
    const user = {
      _id: '123',
      email: 'test@example.com',
      password: 'hash',
      subscription: 'starter',
    };
    User.findOne.mockReturnValue(user);
    jwt.sign.mockReturnValue('token');
    await login(req, res);
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: '123' },
      process.env.SECRET_KEY,
      {
        expiresIn: '23h',
      }
    );
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith('123', {
      token: 'token',
    });
    expect(res.json).toHaveBeenCalledWith({
      token: 'token',
      user: { email: 'test@example.com', subscription: 'starter' },
    });
  });
});
