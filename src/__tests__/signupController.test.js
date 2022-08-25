const { logInUser } = require("../controller/usersController");
const { User } = require("../db/usersSchema.js");
const bcrypt = require("bcrypt");

require("dotenv").config();

describe("logInUser", () => {
  test("should return res.status 200, token should be defined, user object in response should have 2 fields: email and suscription typeof string", async () => {
    const passwordBcrypted = await bcrypt.hash("12345678", 10);

    const mockRes = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };
    const mRes = mockRes();

    const mReq = {
      body: {
        password: "12345678",
        email: "test@test.com",
      },
    };
    const mockUser = {
      password: passwordBcrypted,
      email: "test@test.com",
      subscription: "starter",
      token: "token",
      avatarURL: "avatarUrl",
      save: jest.fn(),
      setToken: jest.fn(),
    };
    await jest
      .spyOn(User, "findOne")
      .mockImplementationOnce(async () => mockUser);

    await logInUser(mReq, mRes);

    expect(mRes.status).toHaveBeenCalledWith(200);
    expect(mRes.json.mock.lastCall[0].token).toBeDefined();
    expect(mRes.json.mock.lastCall[0].user).toHaveProperty("email");
    expect(mRes.json.mock.lastCall[0].user).toHaveProperty("subscription");
    expect(typeof mRes.json.mock.lastCall[0].user.email).toBe("string");
    expect(typeof mRes.json.mock.lastCall[0].user.subscription).toBe("string");
  });
});
