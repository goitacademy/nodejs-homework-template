const mongoose = require("mongoose");
const request = require("supertest");
const { subscriptionList } = require("../../constants/users");

const app = require("../../app");

const User = require("../../models/user");

const { DB_HOST_TEST, PORT } = process.env;

describe("test login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  test("test correct register data", async () => {
    const registerData = {
      email: "test@mail.com",
      password: "123456",
    };
    const { body, statusCode } = await request(app)
      .post("/api/users/register")
      .send(registerData);
    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(registerData.email);

    const user = await User.findOne({ email: registerData.email });
    expect(user.email).toBe(registerData.email);
  });

  test("test correct login data", async () => {
    const loginData = {
      email: "test@mail.com",
      password: "123456",
    };
    const { body, statusCode } = await request(app)
      .post("/api/users/login")
      .send(loginData);
    expect(statusCode).toBe(200);
    expect(body.user.email).toBe(loginData.email);

    const user = await User.findOne({ email: loginData.email });
    expect(user.token).not.toBe("");
    expect(user.email).toBe(loginData.email);
    expect(typeof user.email).toBe("string");
    expect(user.subscription).toEqual(...subscriptionList);
    expect(typeof user.subscription).toBe("string");
  });
});
