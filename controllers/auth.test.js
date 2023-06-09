const { login } = require("./auth");
const User = require("../models/user");
const app = require("../app");
const mongoose = require("mongoose");
const { /* TEST_SECRET_KEY,  */ PORT, TEST_DB_HOST } = process.env;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");

jest.mock("../models/user.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Login Controller", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(TEST_DB_HOST);
  });
  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return status code 200 and a token when valid credentials are provided and login is successful", async () => {
    const req = { body: { email: "test@example.com", password: "password" } };
    const res = { json: jest.fn() };
    const next = jest.fn();
    const mockedUser = { _id: "user_id", password: "hashed_password" };

    // User.findOne.mockResolvedValueOnce(mockedUser);
    jest.spyOn(User, "findOne").mockResolvedValue(mockedUser);
    // User.findOne.mockResolvedValue(mockedUser);
    // find !== finOne !!!

    // bcrypt.compare.mockResolvedValueOnce(true);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    jest.spyOn(jwt, "sign").mockReturnValue("mocked_token");
    // jwt.sign.mockReturnValueOnce("mocked_token");

    jest.spyOn(User, "findByIdAndUpdate").mockResolvedValue(mockedUser);

    await login(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ token: "mocked_token" });
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(next).not.toHaveBeenCalled();
  });

  it("should throw an error with code 401 when invalid credentials are provided", async () => {
    const req = { body: { email: "test@example.com", password: "password" } };
    const res = {};
    const next = jest.fn();
    const mockedUser = null;

    // User.findOne.mockResolvedValueOnce(mockedUser); // user not found
    jest.spyOn(User, "find").mockResolvedValue(mockedUser);

    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);
    // bcrypt.compare.mockReturnValueOnce(false);

    try {
      await login(req, res, next);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("Email or password is incorrect");
    }
  });
});
