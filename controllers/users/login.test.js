// const { User } = require("../../models");
const request = require("supertest");
const {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const app = require("../../app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;
require("dotenv");

mongoose.set("strictQuery", false);

const serverForTest = () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_HOST);
  });
};
describe("login success", () => {
  serverForTest();
  test("login successful", async () => {
    const res = await request(app).post("/users/login").send({
      email: "test@gmail.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(200);
    expect({
      token: res.body.token,
      user: {
        email: res.body.user.email,
        subscription: res.body.user.subscription,
      },
    }).toEqual({
      token: res.body.token,
      user: {
        email: "test@gmail.com",
        subscription: res.body.user.subscription,
      },
    });
  });
});

describe("login or password is wrong", () => {
  serverForTest();
  const invalidLoginTest = async (email, password) => {
    const res = await request(app).post("/users/login").send({
      email,
      password,
    });
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ message: "Email or password is wrong" });
  };

  test("wrong email", async () => {
    await invalidLoginTest("test1@gmail.com", "123456");
  });
  test("wrong password", async () => {
    await invalidLoginTest("test@gmail.com", "023456");
  });
});

describe("login or password is empty field", () => {
  serverForTest();

  const empitinessTest = async (email, password) => {
    const res = await request(app).post("/users/login").send({
      email,
      password,
    });
    expect(res.statusCode).toBe(400);
    if (email === "") {
      expect(res.body).toEqual({
        message: '"email" is not allowed to be empty',
      });
    } else {
      expect(res.body).toEqual({
        message: '"password" is not allowed to be empty',
      });
    }
  };
  test("email is empty field", async () => {
    await empitinessTest("", "123456");
  });
  test("password is empty field", async () => {
    await empitinessTest("test@gmail.com", "");
  });
});
