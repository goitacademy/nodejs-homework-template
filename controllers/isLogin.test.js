import "dotenv/config";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import { User } from "../models/user.js";

mongoose.set("strictQuery", false);

const { DB_TEST_URI } = process.env;

describe("register", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URI);
  });

  it("should register new user", async () => {
    const response = await supertest(app).post("/users/register").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);

    expect({
      status: response.body.status,
      code: response.statusCode,
      data: {
        user: {
          email: "testUser1@gmail.com",
          subscription: response.body.data.user.subscription,
        },
        token: response.body.data.token,
        avatarURL: response.body.data.avatarURL,
      },
    }).toEqual({
      status: "success",
      code: 201,
      data: {
        user: {
          email: "testUser1@gmail.com",
          subscription: response.body.data.user.subscription,
        },
        token: response.body.data.token,
        avatarURL: response.body.data.avatarURL,
      },
    });
  });

  it("should not register the same user 2 times", async () => {
    await supertest(app).post("/users/register").send({
      email: "testUser2@gmail.com",
      password: "123456",
    });

    const response = await supertest(app).post("/users/register").send({
      email: "testUser2@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(409);
  });
});

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect(DB_TEST_URI);
  });

  it("login successful", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);

    expect({
      token: response.body.token,
      user: {
        email: response.body.user.email,
        subscription: response.body.user.subscription,
      },
    }).toEqual({
      token: response.body.token,
      user: {
        email: "testUser1@gmail.com",
        subscription: response.body.user.subscription,
      },
    });
  });

  it("login failed - wrond email", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser12@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(401);

    expect(response.body).toEqual({
      message: "Email or password is wrong",
    });
  });

  it("login failed - wrond password", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser1@gmail.com",
      password: "1234567",
    });

    expect(response.statusCode).toBe(401);

    expect(response.body).toEqual({
      message: "Email or password is wrong",
    });
  });

  it("login failed - empty password field", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser1@gmail.com",
      password: "",
    });

    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual({
      message: '"password" is not allowed to be empty',
    });
  });

  it("login failed - empty emailfield", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "",
      password: "123456",
    });

    console.log(response.body);
    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual({
      message: '"email" is not allowed to be empty',
    });
  });
});
