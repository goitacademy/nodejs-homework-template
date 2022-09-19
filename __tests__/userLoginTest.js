const { userLoginController } = require("../controllers/usersAuthController");

const mockRequest = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  return req;
};

jest.mock("../models/users", () => ({
  userLogin: jest.fn(() => {
    return {
      token: "bababa",
      email: "cropacol@mail.com",
      subscription: "start",
    };
  }),
}));

describe("User Signup test", () => {
  it("Response must have a status code of 200", async () => {
    const req = mockRequest();

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await userLoginController(req, res);
    expect(res.status.mock.lastCall[0]).toEqual(200);
  });

  it("Response should return the token", async () => {
    const req = mockRequest();

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await userLoginController(req, res);
    expect(res.json.mock.lastCall[0].token).toBeTruthy();
  });

  it("Response should return a user object with two fields email and subscription, which have the data type String", async () => {
    const req = mockRequest();

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await userLoginController(req, res);
    expect(res.json.mock.lastCall[0].user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
