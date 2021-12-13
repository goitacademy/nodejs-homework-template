const guard = require("../helpers/guard");
const passport = require("passport");
const { HttpCode } = require("../config/constants");

describe("Unit test guard helper", () => {
  const user = { token: "6779009" };
  let req, res, next;

  beforeEach(() => {
    req = { get: jest.fn((header) => `Bearer ${user.token}`), user };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    next = jest.fn();
  });

    it("User doesn't exist", async () => {
      passport.authenticate = jest.fn(
        (strategy, options, cb) => (req, res, next) => cb(null, false)
      );
      await guard(req, res, next);
      expect(req.get).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
      expect(res.json).toHaveBeenCalled();
    });

  it("User exists but has a wrong token", async () => {
    passport.authenticate = jest.fn(
      (strategy, options, cb) => (req, res, next) =>
        cb(null, { token: "123456" })
    );
    await guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(HttpCode.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalled();
  });

    it("User exists", async () => {
      passport.authenticate = jest.fn(
        (strategy, options, cb) => (req, res, next) => cb(null, user)
      );
      await guard(req, res, next);
      expect(req.get).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
});