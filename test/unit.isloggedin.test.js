const isLoggedIn = require("../helpers/is-loggedin");
const { HttpCodes, Statuses } = require("../helpers/constants");
const { ResponseMessages } = require("../helpers/messages");
const passport = require("passport");

describe("Unit testing isLoggenIn middleware", () => {
  // Mocking data
  const user = { token: "fake-token" };
  const req = { user, get: jest.fn(header => `Bearer ${user.token}`) };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(data => data),
  };
  const next = jest.fn();

  test("when token is not provided", () => {
    // Mocking passport authenticate method when token is not provided
    passport.authenticate = jest.fn((strategy, options, callback) => () => {
      callback(null, false);
    });

    isLoggedIn(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: Statuses.error,
      code: HttpCodes.UNAUTHORIZED,
      message: ResponseMessages.notAuthorized,
    });
  });

  test("when token is not valid", () => {
    // Mocking passport authenticate method when token is not valid
    passport.authenticate = jest.fn((strategy, options, callback) => () => {
      callback(null, { token: "expired-token" });
    });

    isLoggedIn(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: Statuses.error,
      code: HttpCodes.UNAUTHORIZED,
      message: ResponseMessages.notAuthorized,
    });
  });

  test("when valid token is provided", () => {
    // Mocking passport authenticate method when valid token is provided
    passport.authenticate = jest.fn((strategy, options, callback) => () => {
      callback(null, user);
    });

    isLoggedIn(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});