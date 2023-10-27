/* eslint-disable no-undef */
const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app.js");
const { User } = require("../../models/User.js");

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test signup route", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test signup with correct data", async () => {
    const signupData = {
      email: "olgaB@gmail.com",
      password: "12345678",
      subscription: "pro",
    };

    const { statusCode, body } = await request(app)
      .post("/api/auth/users/register")
      .send(signupData);

    expect(statusCode).toBe(201);
    expect(body.email).toBe(signupData.email);
    expect(body.subscription).toBe(signupData.subscription);

    const user = await User.findOne({ email: signupData.email });
    expect(user.subscription).toBe(signupData.subscription);
  });

  test("test singin with correct data", async () => {
    const signupData = {
      email: "olgaB@gmail.com",
      password: "12345678",
      subscription: "pro",
    };

    await request(app).post("/api/auth/users/register").send(signupData);

    const signinData = {
      email: "olgaB@gmail.com",
      password: "12345678",
    };

    const { statusCode, body } = await request(app)
      .post("/api/auth/users/login")
      .send(signinData);

    expect(statusCode).toBe(200);
    expect(body.token).toBeDefined();

    const user = await User.findOne({ email: signinData.email });
    expect(user.email).toBe(signinData.email);
    expect(typeof user.email).toBe("string");
    expect(user.subscription).toBe(signupData.subscription);
    expect(typeof user.subscription).toBe("string");
  });

  test("test login with incorrect email", async () => {
    const signupData = {
      email: "olgaB@gmail.com",
      password: "12345678",
      subscription: "pro",
    };

    await request(app).post("/api/auth/users/register").send(signupData);

    const signinData = {
      email: "email@gmail.com",
      password: "12345678",
    };

    const { statusCode, body } = await request(app)
      .post("/api/auth/users/login")
      .send(signinData);

    expect(statusCode).toBe(401);
    expect(body.message).toBe("Email or password is wrong.");
  });

  test("test login with incorrect password", async () => {
    const signupData = {
      email: "olgaB@gmail.com",
      password: "12345678",
      subscription: "pro",
    };

    await request(app).post("/api/auth/users/register").send(signupData);

    const signinData = {
      email: "olgaB@gmail.com",
      password: "password",
    };

    const { statusCode, body } = await request(app)
      .post("/api/auth/users/login")
      .send(signinData);

    expect(statusCode).toBe(401);
    expect(body.message).toContain("Email or password is wrong.");
  });

  test("test sign up with the same email", async () => {
    const signupData = {
      email: "olgaB@gmail.com",
      password: "12345678",
      subscription: "pro",
    };

    await request(app).post("/api/auth/users/register").send(signupData);

    const singupSameEmail = {
      email: "olgaB@gmail.com",
      password: "987654321",
      subscription: "business",
    };

    const { statusCode, body } = await request(app)
      .post("/api/auth/users/register")
      .send(singupSameEmail);

    expect(statusCode).toBe(409);
    expect(body.message).toBe(`${singupSameEmail.email} is already in use`);
  });
});
