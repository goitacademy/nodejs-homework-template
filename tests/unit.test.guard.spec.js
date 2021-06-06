const guard = require("../helpers/guard");
const passport = require("passport");
require("../config/passport");

const { HttpCode } = require("../helpers/constants");

describe("Unit test guard validation", () => {
  const user = { token: "abc111" };
  const req = { get: jest.fn((header) => `Bearer ${user.token}`), user };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  };
  const next = jest.fn();

  test("run guard with user", async () => {
    passport.authenticate = jest.fn(
      (strategy, option, cb) => (req, res, next) => {
        cb(null, user);
      }
    );
    guard(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test("run guard without user", async () => {
    passport.authenticate = jest.fn(
      (strategy, option, cb) => (req, res, next) => {
        cb(null, false);
      }
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: "Unauthorized",
      code: HttpCode.UNAUTORIZED,
      message: "Not authorized",
    });
  });

  test("run guard with wrong token", async () => {
    passport.authenticate = jest.fn(
      (strategy, option, cb) => (req, res, next) => {
        cb(null, { token: "abc" });
      }
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: "Unauthorized",
      code: HttpCode.UNAUTORIZED,
      message: "Not authorized",
    });
  });

  test("run guard with wrong error", async () => {
    passport.authenticate = jest.fn(
      (strategy, option, cb) => (req, res, next) => {
        cb(new Error("error"), user);
      }
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: "Unauthorized",
      code: HttpCode.UNAUTORIZED,
      message: "Not authorized",
    });
  });
});
