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
const sendEmail = require("../helpers/sendEmail");

jest.mock("../models/user.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("gravatar");
jest.mock("../helpers/sendEmail");

describe("User Auth Controller", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(3030);
    await mongoose.connect(TEST_DB_HOST);
    jest.clearAllMocks();
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
    it("should log in a user with correct credentials and return status code 200 with a token", async () => {
      const req = {
        body: { email: "johndoe@example.com", password: "password" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      jest.spyOn(User, "findOne").mockResolvedValue({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "hashedPassword",
        subscription: "starter",
        avatarURL: "avatarURL",
        verificationToken: "token",
        verify: true,
      });

      bcrypt.compare.mockResolvedValue(true);
      gravatar.url.mockReturnValue("avatarURL");
      jwt.sign.mockReturnValueOnce("token");

      await login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({
        email: "johndoe@example.com",
      });
      expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedPassword");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        token: expect.any(String),
        user: {
          name: "John Doe",
          email: "johndoe@example.com",
          subscription: "starter",
          avatarURL: "avatarURL",
        },
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return a 401 status if email or password is incorrect", async () => {
      // User.findOne.mockResolvedValue(null);
      jest.spyOn(User, "findOne").mockResolvedValue(null);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(false);
      // bcrypt.compare.mockReturnValueOnce(false);

      const req = {
        body: {
          email: "test@example.com",
          password: "password",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      try {
        await login(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.statusCode).toBe(401);
        // expect(res.status).toHaveBeenCalledWith(401);
        expect(error.message).toBe("Email or password is incorrect");
        /* expect(res.json).toHaveBeenCalledWith({
          message: "Email or password is incorrect",
        });
        expect(res.json).toHaveBeenCalledWith({
          error: "Email or password is incorrect",
        }); */
      }
    });
  });

  describe("Register Controller", () => {
    it("should register a new user and return status code 201 with user data", async () => {
      bcrypt.hash.mockResolvedValue("hashedPassword");
      gravatar.url.mockReturnValue("avatarURL");
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        name: "John Doe",
        email: "johndoe@example.com",
        subscription: "free",
        avatarURL: "avatarURL",
        verificationToken: expect.any(String),
      });

      // jest.spyOn(User, "findOne").mockResolvedValue(null);
      // jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed_password");
      // jest.spyOn(gravatar, "url").mockReturnValue("avatar_url");
      // jest.spyOn(User, "create").mockResolvedValue({name: "John Doe",
      // email: "johndoe@example.com",
      // subscription: "free",
      // avatarURL: "avatarURL",
      // verificationToken: expect.any(String)});

      const req = {
        body: {
          name: "John Doe",
          email: "johndoe@example.com",
          password: "password",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await register(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({
        email: "johndoe@example.com",
      });
      expect(bcrypt.hash).toHaveBeenCalledWith("password", 10);
      expect(User.create).toHaveBeenCalledWith({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "hashedPassword",
        avatarURL: "avatarURL",
        verificationToken: expect.any(String),
      });
      expect(gravatar.url).toHaveBeenCalledWith("johndoe@example.com", {
        s: 250,
        d: "mp",
        r: "pg",
      });
      expect(sendEmail).toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        name: "John Doe",
        email: "johndoe@example.com",
        subscription: "free",
        avatarURL: "avatarURL",
        verificationToken: expect.any(String),
      });

      expect(next).not.toHaveBeenCalled();
    });

    it("should return a 409 status if the email is already in use", async () => {
      User.findOne.mockResolvedValue({
        email: "johndoe@example.com",
      });
      const req = {
        body: {
          name: "John Doe",
          email: "johndoe@example.com",
          password: "password",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      try {
        await register(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.status).toBe(409);
        expect(error.message).toBe("Email already in use");
        // expect(next).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
          error: "Email already in use",
        });
      }

      expect(User.findOne).toHaveBeenCalledWith({
        email: "johndoe@example.com",
      });
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
