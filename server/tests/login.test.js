import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";
import User from "../services/models/users.js";
import gravatar from "gravatar";
import { nanoid } from "nanoid";

const SRV_DB = process.env.DB_HOST;

const body = {
  username: "test",
  email: "test@gmail.com",
  password: "$2a$10$GDvbb5G27UijVE0q.k4FuOgJM.w2Qcv96rqLt6ovfwa6q3GRD/qCq",
  avatarURL: gravatar.url("test@gmail.com", { s: "250", r: "pg", d: "mp" }, true),
  pubId: nanoid(),
};

const createUser = async body => {
  try {
    await User.create(body);
  } catch (err) {
    throw new Error(err);
  }
};

const deleteUser = async email => {
  try {
    await User.findOneAndRemove({ email }).lean();
  } catch (err) {
    throw new Error(err);
  }
};

const sampleSuccessfulLogin = async () => {
  try {
    const res = await request(app).post("/api/users/login").send({
      email: "test@gmail.com",
      password: "test1234",
    });

    return res.body;
  } catch (err) {
    throw new Error(err);
  }
};

const sampleUnsuccessfulLogin = async () => {
  try {
    const res = await request(app).post("/api/users/login").send({
      email: "test@gmail.com",
      password: "test12345",
    });

    return res.body;
  } catch (err) {
    throw new Error(err);
  }
};

const sampleValidationLoginError = async () => {
  try {
    const res = await request(app).post("/api/users/login").send({
      email: "test@gmail.com",
    });

    return res.body;
  } catch (err) {
    throw new Error(err);
  }
};

describe("successful user login", () => {
  let res;

  beforeAll(async () => {
    try {
      await mongoose.connect(SRV_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await createUser(body);
    } catch (err) {
      throw new Error(err);
    }
  });

  beforeEach(async () => {
    res = await sampleSuccessfulLogin();
  });

  test("should return status 200 OK", () => {
    const { status, statusText } = res;
    expect(status).toBe(200);
    expect(statusText).toBe("OK");
  });

  test("should return a token", () => {
    const { token } = res.data;
    expect(typeof token).toBe("string");
    expect(token).toBeTruthy();
  });

  test("should return a user object with valid email and subscription fields", () => {
    const { user } = res.data;

    expect(user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });

    expect(user.email).toBeTruthy();
    expect(user.subscription).toBeTruthy();
  });

  describe("unsuccessful user login", () => {
    let res;

    beforeEach(async () => {
      res = await sampleUnsuccessfulLogin();
    });

    test("should return status 401 Unauthorized", () => {
      const { status, statusText } = res;
      expect(status).toBe(401);
      expect(statusText).toBe("Unauthorized");
    });

    test("should return message 'Incorrect e-mail or password'", () => {
      const {
        data: { message },
      } = res;
      expect(message).toBe("Incorrect e-mail or password");
    });
  });

  describe("user login error during validation", () => {
    let res;

    beforeEach(async () => {
      res = await sampleValidationLoginError();
    });

    test("should return status 400 Bad Request", () => {
      const { status, statusText } = res;
      expect(status).toBe(400);
      expect(statusText).toBe("Bad Request");
    });

    test("should return valid error message", () => {
      const { data } = res;

      expect(data).toMatchObject({
        message: expect.any(String),
      });

      expect(data.message).toBeTruthy();
    });
  });

  afterAll(async () => {
    try {
      await deleteUser(body.email);
      await mongoose.disconnect();
    } catch (err) {
      throw new Error(err);
    }
  });
});