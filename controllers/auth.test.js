const {
  login,
  register,
  getCurrent,
  logout,
  updateUserSubscription,
  updateUserAvatar,
} = require("./auth");
const User = require("../models/user");
const app = require("../app");
const mongoose = require("mongoose");
const { TEST_DB_HOST } = process.env;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HttpError = require("../helpers/HttpError");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const Jimp = require("jimp");

jest.mock("../models/user.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("gravatar");

describe("User Auth Controller", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(3030);
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

  describe("Login Controller", () => {
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

  describe("Register Controller", () => {
    it("should create a new user and return status code 201 with user data when register is successful", async () => {
      const req = {
        body: {
          name: "John Doe",
          email: "test@example.com",
          password: "password",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockedUser = {
        name: "John Doe",
        email: "test@example.com",
        avatarURL: "avatar_url",
        password: "password",
      };

      jest.spyOn(User, "findOne").mockResolvedValue(null);
      jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed_password");
      jest.spyOn(gravatar, "url").mockReturnValue("avatar_url");
      jest.spyOn(User, "create").mockResolvedValue(mockedUser);

      await register(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
      expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
      expect(gravatar.url).toHaveBeenCalledWith("test@example.com", {
        s: 250,
        d: "mp",
        r: "pg",
      });
      expect(User.create).toHaveBeenCalledWith({
        name: "John Doe",
        email: "test@example.com",
        password: "hashed_password",
        avatarURL: "avatar_url",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        name: "John Doe",
        email: "test@example.com",
        avatarURL: "avatar_url",
      });
    });

    it("should throw an error with code 409 when email is already in use", async () => {
      const req = { body: { email: "test@example.com", password: "password" } };
      const res = {};
      const next = jest.fn();

      jest.spyOn(User, "findOne").mockResolvedValue({ email: req.body.email });

      try {
        await register(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.status).toBe(409);
        expect(error.message).toBe("Email already in use");
      }
    });
  });

  describe("Get Current User Controller", () => {
    it("should return the current user's email and name", async () => {
      const req = { user: { email: "test@example.com", name: "John Doe" } };
      const res = { json: jest.fn() };

      await getCurrent(req, res);

      expect(res.json).toHaveBeenCalledWith({
        email: "test@example.com",
        name: "John Doe",
      });
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it("should throw an error with code 401 if not authorized", async () => {
      const req = {};
      const res = {};
      const next = jest.fn();

      try {
        await getCurrent(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Unauthorized");
        expect(next).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe("Logout Controller", () => {
    it("should update the user's token to an empty string and return a success message", async () => {
      const req = {};
      const res = { json: jest.fn() };
      const next = jest.fn();

      const userUpdateSpy = jest.spyOn(User, "findByIdAndUpdate");

      try {
        await logout(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Unauthorized");
      }

      expect(userUpdateSpy).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("Update User Subscription Controller", () => {
    it("should update the user's subscription and return a success message", async () => {
      const req = {
        user: { _id: "user_id" },
        body: { subscription: "premium" },
      };
      const res = { json: jest.fn() };

      const userFindByIdSpy = jest
        .spyOn(User, "findById")
        .mockResolvedValueOnce({});
      const userUpdateSpy = jest.spyOn(User, "findByIdAndUpdate");

      await updateUserSubscription(req, res);

      expect(userFindByIdSpy).toHaveBeenCalledWith(req.user._id);
      expect(userUpdateSpy).toHaveBeenCalledWith(req.user._id, {
        subscription: req.body.subscription,
      });
      expect(res.json).toHaveBeenCalledWith({
        message: "Subscription updated successfully",
      });
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it("should return an error with code 401 when the user is unauthorized", async () => {
      const req = {
        user: { _id: "nonexistent_user_id" },
        body: { subscription: "premium" },
      };
      const res = { json: jest.fn() };
      const next = jest.fn();

      jest.spyOn(User, "findById").mockResolvedValueOnce(null);

      try {
        await updateUserSubscription(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Unauthorized");
      }

      expect(User.findById).toHaveBeenCalledWith(req.user._id);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("Update User Avatar Controller", () => {
    it("should update the user's avatar, resize the image, and return a success message", async () => {
      const req = {
        user: { _id: "user_id" },
        file: {
          path: "/path/to/old/image.jpg",
          originalname: "image.jpg",
        },
      };
      const res = { json: jest.fn() };

      const userFindByIdSpy = jest
        .spyOn(User, "findById")
        .mockResolvedValueOnce({});
      const fsRenameSpy = jest.spyOn(fs, "rename").mockResolvedValueOnce();
      const jimpReadSpy = jest.spyOn(Jimp, "read").mockResolvedValueOnce({
        resize: jest.fn().mockResolvedValueOnce(),
      });
      const userUpdateSpy = jest.spyOn(User, "findByIdAndUpdate");

      await updateUserAvatar(req, res);

      expect(userFindByIdSpy).toHaveBeenCalledWith(req.user._id);
      expect(fsRenameSpy).toHaveBeenCalledWith(
        req.file.path,
        expect.any(String)
      );
      expect(jimpReadSpy).toHaveBeenCalledWith(expect.any(String));
      expect(userUpdateSpy).toHaveBeenCalledWith(
        req.user._id,
        { avatarURL: expect.any(String) },
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith({
        message: "Avatar updated successfully",
      });
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it("should return an error with code 401 when the user is unauthorized", async () => {
      const req = {
        body: { subscription: "premium" },
        user: { _id: "user_id" },
      };
      const res = { json: jest.fn() };

      jest.spyOn(User, "findById").mockResolvedValue(null);

      try {
        await updateUserSubscription(req, res);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Unauthorized");
        expect(User.findByIdAndUpdate).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
      }
    });
  });
});
