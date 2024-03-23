import mongoose from "mongoose";
import request from "supertest";
import app from "../../app.js";
import User from "../../models/User.js";

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test /api/auth.signin route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(() => {});

  afterEach(async () => {
    await User.deleteMany();
  });

  test("test /api/auth/signin with correctData", async () => {
    const userData = {
      username: "TestUser",
      email: "testuser@example.com",
      password: "test123",
    };
    await User.create(userData);

    const signinData = {
      email: userData.email,
      password: userData.password,
    };
    const { body, statusCode } = await request(app)
      .post("/api/auth/signin")
      .send(signinData);

    expect(statusCode).toBe(200);
    expect(body.username).toBe(userData.username);
    expect(body.email).toBe(userData.email);
    expect(body.token).toBeDefined();
  });

  test("test /api/auth/signin with incorrectPassword", async () => {
    const userData = {
      username: "TestUser",
      email: "testuser@example.com",
      password: "test123",
    };
    await User.create(userData);

    const signinData = {
      email: userData.email,
      password: "wrongpassword",
    };
    const { statusCode } = await request(app)
      .post("/api/auth/signin")
      .send(signinData);

    expect(statusCode).toBe(401);
  });

  test("test /api/auth/signin with nonExistingUser", async () => {
    const signinData = {
      email: "nonexisting@example.com",
      password: "password",
    };
    const { statusCode } = await request(app)
      .post("/api/auth/signin")
      .send(signinData);

    expect(statusCode).toBe(404);
  });
});
