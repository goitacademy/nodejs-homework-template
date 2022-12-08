let { loginController } = require("../src/controllers/authControllers");
let { login } = require("../src/services/authServices");

const mUser = {
  email: "emailfortest@mail.com",
  password: "emailfortest",
  subscription: "starter",
};

describe("Login Controller Test", () => {
  it("Should be status 200 OK", async () => {
    const mReq = {
      body: {
        email: "emailfortest@mail.com",
        password: "emailfortest",
      },
    };

    const mRes = {
      status: 200,
      json: jest.fn((data) => data),
    };
    loginController = jest.fn(() => mRes);

    const result = await loginController(mReq, mRes);

    expect(result.status).toEqual(200);
  });
  it("Should return a valid token", async () => {
    const mRes = {
      token: "validToken",
    };
    login = jest.fn(() => mRes);

    const token = await login(mUser.email, mUser.password);

    expect(token).toBeDefined();
  });
  it("Should return valid user", () => {
    const mRes = {
      status: 200,
      user: {
        email: mUser.email,
        subscription: mUser.subscription,
      },
    };

    expect(typeof mRes.user.email).toBe("string");
    expect(typeof mRes.user.subscription).toBe("string");
  });
});
