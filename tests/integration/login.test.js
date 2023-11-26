require("dotenv").config();

const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../../app");
const { User, subscriptionTypes } = require("../../models/user");

mongoose.set("strictQuery", false);

const { DB_TEST_HOST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    await User.deleteMany();

    await supertest(app).post("/users/register").send({
      email: "testEmail@gmail.com",
      password: "12345678",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_HOST);
  });

  test("should login existing user", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testEmail@gmail.com",
      password: "12345678",
    });

    const { statusCode, body } = response;
    const { user, token } = body;

    expect(statusCode).toBe(200);
    expect(user.email).toBe("testEmail@gmail.com");
    expect(subscriptionTypes).toContain(user.subscription);
    expect(token).not.toBeNull();
  });

  test("should not login a user, because of invalid email", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "invalidEmail@gmail.com",
      password: "12345678",
    });

    const { statusCode, body } = response;
    const { message } = body;

    expect(statusCode).toBe(401);
    expect(message).toBe("Email or password is wrong");
  });

  test("should not login a user, because of invalid password", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testEmail@gmail.com",
      password: "invalidPassword",
    });

    const { statusCode, body } = response;
    const { message } = body;

    expect(statusCode).toBe(401);
    expect(message).toBe("Email or password is wrong");
  });
});
