const { users: controllers } = require("../../controllers");
const services = require("../../services");

describe("Login", () => {
  test("User should login with correct token", async () => {
    const next = jest.fn();
    const req = {
      body: {
        email: "email@mail.com",
        password: "3333333",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    services.loginUser = jest.fn(() => {
      return { token: "test-jwt-token" };
    });
    const result = await controllers.login(req, res, next);
    expect(result.code).toBe(200);
    expect(next).toBeCalledTimes(0);
  });
});
