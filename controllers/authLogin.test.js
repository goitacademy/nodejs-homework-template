const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_TEST_HOST = "", PORT } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login route", async () => {
    const newUser = {
      email: "trend@gmail.com",
      password: "123456",
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "trend@gmail.com",
      password: "123456",
    };

    // 1. відповідь повина мати статус-код 200
    // 2. у відповіді повинен повертатися токен
    // 3. у відповіді повинен повертатися об'єкт user з 2 полями:
    // email и subscription з типом даних String

    const response = await request(app).post("/api/auth/login").send(loginUser);
    expect(response.statusCode).toBe(200);

    const { body } = response;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);

    expect(typeof body.user.email).toBe("String");
    expect(typeof body.user.subscription).toBe("String");
  });
});
