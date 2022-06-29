const { users: controllers } = require("../../controllers");
// const signin = require("./signin");

const services = require("../../services");
const { sendEmail } = require("../../helpers");

describe("User register controller", () => {
  test("New user should register with new email", async () => {
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

    services.signinUser = jest.fn((data) => data);
    const sendEmail = jest.fn();
    const result = await controllers.signin(req, res, next);
    expect(result.code).toBe(201);
    expect(result.data.email).toBe("email@mail.com");
    expect(result.data.password).toBeUndefined();
    expect(next).toBeCalledTimes(0);
    expect(sendEmail).toBeCalledTimes(1);
  });

  test("Do not register old user", async () => {
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

    services.signinUser = jest.fn((data) => {
      throw new Error();
    });

    await controllers.signin(req, res, next);

    expect(next).toBeCalledTimes(1);
  });
});
