require("dotenv").config();

const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../../app");
const { User} = require("../../models/user");


mongoose.set("strictQuery", false);

const { DB_TEST_URI } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);
    await User.deleteMany();

    await supertest(app).post("/users/register").send({
      email: "userauthtest@gmail.com",
      password: "123456qwert",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URI);
  });

  test("should login existing user", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "userauthtest@gmail.com",
      password: "123456qwert",
    });
  
    const { statusCode, body } = response;
    const { user, token } = body;
  
    expect(statusCode).toBe(200);
    expect(user.email).toBe("userauthtest@gmail.com");
    expect(user).toHaveProperty("subscription");
    expect(typeof user.subscription).toBe("string");
  
    expect(token).not.toBeNull();
  });

  test("should not login a user, because of invalid email", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "invalidEmail@gmail.com",
      password: "123456qwert",
    });

    const { statusCode, body } = response;
    const { message } = body;

    expect(statusCode).toBe(401);
    expect(message).toBe("Email or password is wrong");
  });

  test("should not login a user, because of invalid password", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "userauthtest@gmail.com",
      password: "invalidPassword",
    });

    const { statusCode, body } = response;
    const { message } = body;

    expect(statusCode).toBe(401);
    expect(message).toBe("Email or password is wrong");
  });
});