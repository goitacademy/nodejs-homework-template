const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const { DB_URI } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_URI);
  });
  afterAll(async () => {
    await mongoose.disconnect(DB_URI);
  });

  test("should return response status code 200", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "test@gmail.com",
      password: "111111",
    });

    expect(response.statusCode).toBe(200);
  });

  test("should return in response.body token", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "test@gmail.com",
      password: "111111",
    });

    expect(response.body.token).toBeTruthy();
  });

  test("should return in response.body user with 2 fields (email and subscription) with type String", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "test@gmail.com",
      password: "111111",
    });

    expect(response.body.user).toBeTruthy();
    expect(response.body.user).toBeInstanceOf(Object);
    expect(response.body.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
