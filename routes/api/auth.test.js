const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_HOST } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.set("strictQuery", false);
    mongoose.connect(DB_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.close(() => done());
  });

  test("test signup route", async () => {
    const newUser = {
      name: "Test",
      email: "maryna@gmail.com",
      password: await bcrypt.hash("123456", 10),
      avatarURL: "63bc201e8b75a5767c76cd4a_cover.jpg",
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "maryna@gmail.com",
      password: "123456",
    };

    const response = await request(app).post("/api/login").send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toBeTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token.toString());
    const data = await User.findById(user._id);
    const newData = data.email + `, ` + data.subscription;
    expect(newData).toBe(body.email + `, ` + data.subscription);
  });
});
