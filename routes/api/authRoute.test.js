import mongoose from "mongoose";
import "dotenv/config";
import request from "supertest";
import app from "../../app";
import User from "../../models/User";

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test/api/auth/signup", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
  beforeEach(() => {});

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test signup with correctData", async () => {
    const signupData = {
      email: "serhii@gmail.com",
      password: "serhii12345",
    };
    const { statusCode, body } = await request(app)
      .post("/api/auth/signup")
      .send(signupData);
    expect(statusCode).toBe(201);
    expect(body.email).toBe(signupData.email);

    const user = await User.findOne({ email: signupData.email });
    expect(user.email).toBe(signupData.email);
  });
});

describe("test/api/auth/signin", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });
  beforeEach(() => {});

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("Test signin with correct status", async () => {
    const signinUser = {
      email: "serhii@gmail.com",
      password: "serhii12345",
    };
    const { statusCode } = await request(app)
      .post("/api/auth/signin")
      .send(signinUser);
    expect(statusCode).toBe(200);
  });

  test("Test signin with correct token", async () => {
    const signinUser = {
      email: "serhii@gmail.com",
      password: "serhii12345",
    };
    const response = await request(app)
      .post("/api/auth/signin")
      .send(signinUser);

    expect(response.body.token).toBeDefined();
    expect(
      typeof response.body.user.email && typeof response.body.user.subscription
    ).toBe("string");
  });
});
