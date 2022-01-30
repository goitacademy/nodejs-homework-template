const mongoose = require("mongoose");
const request = require("supertest");
const { response } = require("../../app");
require("dotenv").config();
const app = require("../../app");
const { User } = require("../../model/user");
const { DB_TEST_HOST } = process.env;

describe("auth test", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());
  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });
  test("test register route", async () => {
    const registerData = {
      name: "Roman",
      email: "xetyri2014@gmail.com",
      password: "1234526",
    };
    const response = await (
      await request(app).post("/api/auth/signup")
    ).send(registerData);
  });
  expect(response.statusCode).toBe(201);
  expect(response.body.message).toBe("Register success");

  const user = await User.findById(response.body._id);
  expect(user).toByThruthy();
  expect(user.name).toBe(registerData.name);
  expect(user.email).toBe(registerData.email);
  expect(user.password).toBe(registerData.password);

  test("test login route", async () => {
    const loginData = {
      email: "xetyri2014@gmail.com",
      password: "1234526",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginData);

    expect(response.statusCode).toBe(200);

    const user = await User.findOne(response.body.email);
    expect(user.token).toByThruthy();
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});