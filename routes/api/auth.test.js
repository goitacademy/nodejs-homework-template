const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const { User } = require("../../model/user");

const { DB_TEST_HOST } = process.env;

describe("test auth", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").then(() => {
      mongoose.connection.db.dropCollection("contacts").then(() => {
        mongoose.connection.close(() => done());
      });
    });
  });

  test("test login route", async () => {
    const loginData = {
      email: "Elena123@gmail.com",
      password: "1234567",
    };

    await request(app).post("/api/users/login").send(loginData);
    const response = await request(app)
      .post("/api/users/login")
      .send(loginData);

    // проверка ответа
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Login is successfull");

    // проверка данных из базы
    const user = await User.findById(response.body._id);
    expect(user).toByThruthy();
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
    // expect(user.email).toBeType("string");
    // expect(user.subscription).toBeType("string");
  });
});
