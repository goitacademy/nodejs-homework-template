const jwt = require('jsonwebtoken');
const login = require('./login');
const { User } = require('../../models');

const mockUser = {
  _id: 'user_id',
  email: 'testuser@example.com',
  password: 'password',
  subscription: 'pro',
  comparePassword: function (password) {
    return password === this.password
  },
};

jest.mock('../../models/user', () => {
  return {
    User: {
      findOne: jest.fn().mockImplementationOnce(() => mockUser),
      findByIdAndUpdate: jest.fn().mockImplementationOnce(() => { mockUser.token = mockToken }),
    },
  }
})

const req = {
  body: {
    email: mockUser.email,
    password: mockUser.password,
  },
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const mockToken = 'mockToken';

describe('Login', () => {
  it('should return 200 status code and token with user object', async () => {
    jest.spyOn(jwt, 'sign').mockReturnValue(mockToken);

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(mockUser.token).toEqual(mockToken);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      code: 200,
      data: {
        token: expect.any(String),
        user: {
          email: mockUser.email,
          subscription: mockUser.subscription,
        },
      },
    });
  });
});
