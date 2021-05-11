const guard = require("../helpers/guard");
const { HttpCode } = require("../helpers/constants");
const { User } = require("../model/__mocks__/data");

describe("Unit test: helper/guard", () => {
  // const req = { user: User };
  // const res = {
  //   status: jest.fn().mockReturnThis(),
  //   json: jest.fn((response) => response),
  // };
  const Subscription = {
    FREE: "free",
    PRO: "pro",
    PREMIUM: "premium",
  };
  const next = jest.fn();

  // test("run function with right role", () => {
  //   guard(User)(req, res, next);
  //   expect(next).toHaveBeenCalled();
  // });
  test("run function with right subscription", () => {
    subscription(Subscription.FREE)(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  test("run function with wrong role", () => {
    expect(result.status).toEqual("error");
    expect(result.code).toEqual(HttpCode.FORBIDDEN);
    expect(result.message).toEqual("Access denied");
  });
});
