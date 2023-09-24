import mongoose from "mongoose";
import request from "supertest";

import app from "../app.js";

import User from "../models/User.js";

const { DB_HOST_TEST, PORT } = process.env;

describe("test signin route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  // "This fnc start befor this test"
  beforeEach(() => {});
  // "This fnc start after this test"
  afterEach(async () => {});

  test("test signin with correct data", async () => {
    const signinData = {
      email: "test21@gmail.com",
      password: "123456789",
    };
    const { body, statusCode } = await request(app)
      .post("/api/auth/signin")
      .send(signinData);

    const { email, subscription } = body.user;

    expect(statusCode).toBe(200);
    expect(body).toHaveProperty("accessToken");
    expect(body).toHaveProperty("refreshToken");
    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");
    expect(email).toEqual(expect.any(String));
    expect(subscription).toEqual(expect.any(String));

    const user = await User.findOne({ email: signinData.email });
    expect(user.email).toBe(signinData.email);
  });
});
