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

  afterAll((done) => {
    mongoose.connection.db.dropCollection("users").then(() => {
      mongoose.connection.db.dropCollection("contacts").then(() => {
        mongoose.connection.close(() => done());
      });
    });
  });

  test("test login route", async () => {
    // для удобства здесь отправить запрос на создание пользователя
    const loginData = {
      email: "Elena123@gmail.com",
      password: "1234567",
    };

    const response = await request(app).post("/api/auth/login").send(loginData);

    console.log("Response result: ", response.body);
    // проверка ответа
    expect(response.statusCode).toBe(200);
    expect(response.body.user.token).not.toBe("");

    // проверка данных из базы
    const user = await User.findOne(response.body.email);
    expect(user).toBeTruthy();
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
