const guard = require('../helpers/guard');
const passport = require('passport');

const { HttpCode } = require('../config/constants');

describe('Unit test for guard helper', function () {
  const user = { token: '123456' };
  let req, res, next;

  beforeEach(() => {
    req = { get: jest.fn(header => `Bearer ${user.token}`), user };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(data => data),
    };
    next = jest.fn();
  });

  it('User exists', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => cb(null, user),
    );

    await guard(req, res, next);

    expect(req.get).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('User exists but has wrong token', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) =>
        cb(null, { token: 'wrong_token' }),
    );

    await guard(req, res, next);

    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalled();
  });

  it('User does not exists', async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) => cb(null, { token: false }),
    );

    await guard(req, res, next);

    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalled();
  });
});
