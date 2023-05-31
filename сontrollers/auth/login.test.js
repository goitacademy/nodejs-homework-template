/* eslint-disable no-undef */
// -the reposne has to be status 200
// - the response has to have token
// - the response has to have object user with 2 fields - email (type string) and subscription (type string)

// const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mocking the dependencies
jest.mock('../../models/user');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

// Import the login function
const login = require('./login');

describe('Login', () => {
  const req = {
    body: {
      email: 'test@example.com',
      password: 'password123',
    },
  };

  const createResponse = () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      // eslint-disable-next-line no-undef
      json: jest.fn(),
    };
    return res;
  };

  // eslint-disable-next-line no-undef
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return status 200, token, and user object with email and subscription', async () => {
    const mockToken = 'mockToken';
    const mockUser = {
      email: 'test@example.com',
      subscription: 'premium',
    };

    // Mocking User.findOne to return a user
    User.findOne = jest.fn().mockResolvedValue(mockUser);

    // Mocking bcrypt.compare to return true
    bcrypt.compare = jest.fn().mockResolvedValue(true);

    // Mocking jwt.sign to return a token
    jwt.sign = jest.fn().mockReturnValue(mockToken);

    // Mocking User.findByIdAndUpdate to update the token
    User.findByIdAndUpdate = jest.fn();

    // Invoke the login function
    const res = createResponse();
    await login(req, res);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      req.body.password,
      mockUser.password
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: mockUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: '23h',
      }
    );
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, {
      token: mockToken,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: mockToken,
      user: {
        email: mockUser.email,
        subscription: mockUser.subscription,
      },
    });
  });

  test('should throw HttpError with status 401 if user not found', async () => {
    // Mocking User.findOne to return null
    User.findOne = jest.fn().mockResolvedValue(null);

    // Invoke the login function
    const res = createResponse();
    await expect(login(req, res)).rejects.toThrow(
      res.status(401).json({
        message: 'Email or password is wrong',
      })
    );

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Email or password is wrong',
    });
  });

    test('should throw HttpError with status 401 if password is incorrect', async () => {
      // Mocking User.findOne to return a user
      User.findOne = jest.fn().mockResolvedValue({ password: 'hashedPassword' });

      // Mocking bcrypt.compare to return false
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      // Invoke the login function
      const res = createResponse();
      await expect(login(req, res)).rejects.toThrow(
        res.status(401).json({
          message: 'Email or password is wrong',
        })
      );

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        req.body.password,
        'hashedPassword'
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Email or password is wrong',
      });
    });
});
