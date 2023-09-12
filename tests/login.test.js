const { default: mongoose } = require("mongoose");
const app = require("../app");
const users = require("../models/users");
const supertest = require("supertest");
require("dotenv").config();

const { DB_TEST_URI } = process.env;

mongoose.set("strictQuery", false);

describe("login", function () {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI).then(() => {
      console.log("Conection DB cool");
    });

    await users.deleteMany();
  });

  afterAll(() => {
    mongoose.disconnect(DB_TEST_URI);
  });

  test("should be return status code 200", async () => {
    await supertest(app)
      .post("/api/users/register")
      .send({ email: "test1.test@gmail.com", password: "test" });

    const res = await supertest(app)
      .post("/api/users/login")
      .send({ email: "test1.test@gmail.com", password: "test" });

    expect(res.statusCode).toBe(200);
  });

  test("should be return auth token", async () => {
    await supertest(app)
      .post("/api/users/register")
      .send({ email: "test2.test@gmail.com", password: "test" });

    const res = await supertest(app)
      .post("/api/users/login")
      .send({ email: "test2.test@gmail.com", password: "test" });

    expect(res.body.user).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    );
  });

  test("should be return email and subscription", async () => {
    await supertest(app)
      .post("/api/users/register")
      .send({ email: "test3.test@gmail.com", password: "test" });

    const res = await supertest(app)
      .post("/api/users/login")
      .send({ email: "test3.test@gmail.com", password: "test" });

    expect(res.body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
