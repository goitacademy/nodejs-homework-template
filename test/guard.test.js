const guard = require("../helpers/guard");
const { HttpCode } = require("../helpers/constants");
const { User } = require("../model/__mocks__/data");
const passport = require("passport");

describe("Unit test: helper/guard", () => {
  //mock`аем у guard метод гет, а также статус и джейсон
  const req = { get: jest.fn((header) => `Bearer ${User.token}`), user: User }; // когда приходит хедер, имитируем авторизацию, выдаем токен, в req. user ложиться user(11/32.21)
  const res = {
    status: jest.fn().mockReturnThis(), //респ. статус должен вернуть this
    json: jest.fn((response) => response), //response пробрасываем дальше
  };

  const next = jest.fn(); //просто замоканая ф-я

  test("run guard with user", () => {
    passport.authenticate = jest.fn((authType, options, callback) => () => {
      callback(null, User);
    });
    guard(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test("run guard without user", () => {
    passport.authenticate = jest.fn(
      (authType, options, callback) => (req, res, next) => {
        callback(null, false);
      }
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: "error",
      code: HttpCode.UNAUTHORISED,
      data: "Unauthorized",
      message: "Unauthorized. Access denied",
    });
  });

  test("run guard with wrong user token", () => {
    passport.authenticate = jest.fn(
      (authType, options, callback) => (req, res, next) => {
        callback(null, { token: null });
      }
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: "error",
      code: HttpCode.UNAUTHORISED,
      data: "Unauthorized",
      message: "Unauthorized. Access denied",
    });
  });

  test("run guard with error", () => {
    passport.authenticate = jest.fn(
      (authType, options, callback) => (req, res, next) => {
        callback(true, null);
      }
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: "error",
      code: HttpCode.UNAUTHORISED,
      data: "Unauthorized",
      message: "Unauthorized. Access denied",
    });
  });
});
