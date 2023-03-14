const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { DB_TEST_HOST, PORT_TEST } = process.env;

describe("Test auth routes ", () => {
  let server;
  let user;
  beforeAll(() => (server = app.listen(PORT_TEST)));
  afterAll(() => server.close());

  beforeEach(async () => {
    mongoose.set("strictQuery", false);
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(DB_TEST_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    user = await User.create({
      email: "testuser@test.com",
      password: await bcrypt.hash("password", 10),
      avatarURL: "testlink",
    });
  });

  afterEach(async () => {
    await User.deleteMany({});
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  });

  test("Test login route status code 200", async () => {
    const loginUser = { email: "testuser@test.com", password: "password" };
    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    expect(response.statusCode).toBe(200);
  });
  test("Test login route return the correct token", async () => {
    const loginUser = { email: "testuser@test.com", password: "password" };
    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    const { body } = response;
    const { token } = await User.findById(user._id);
    expect(body.token).toBeTruthy();
    expect(body.token).toBe(token);
  });
  test("Test login route return object with email,subscription type String", async () => {
    const loginUser = { email: "testuser@test.com", password: "password" };
    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    const { body } = response;
    const { email, subscription } = await User.findById(user._id);
    expect(body.data.email).toEqual(expect.any(String));
    expect(body.data.subscription).toEqual(expect.any(String));
    expect(body.data.email).toBe(email);
    expect(body.data.subscription).toBe(subscription);
  });
});
