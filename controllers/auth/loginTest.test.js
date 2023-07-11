const jwt = require("jsonwebtoken");
const loginController = require("./login");
const User = require("../../models/users");

jest.mock("jsonwebtoken"); // Mock the jsonwebtoken library

describe("Login Controller", () => {
  test("should return token and user object with correct fields", async () => {
    const email = "test@example.com";
    const password = "password";
    const token = "jwt-token";
    const user = {
      _id: "user-id",
      email,
      subscription: "starter",
    };

    User.findOne.mockResolvedValue(user); // Mock the User.findOne method
    jwt.sign = jest.fn().mockReturnValue(token); // Mock the jwt.sign method

    const req = { body: { email, password } };
    const res = {
      json: jest.fn(),
    };

    await loginController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      token,
      user: {
        email: expect.any(String),
        subscription: expect.any(String),
      },
    });
  });

  test("should throw error if user not found", async () => {
    const email = "test@example.com";
    const password = "password";

    User.findOne.mockResolvedValue(null); // Mock the User.findOne method

    const req = { body: { email, password } };
    const res = {
      json: jest.fn(),
    };

    await expect(loginController(req, res)).rejects.toThrowError(
      "Incorrect login or password"
    );
    expect(res.json).not.toHaveBeenCalled();
  });
});