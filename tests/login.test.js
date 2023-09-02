require("dotenv").config();
const Jest = require("jest");
const superTest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");

mongoose.set("strictQuery", false);

const { DB_URI } = process.env;

describe("Login", () => {
  afterAll(async () => {
    await mongoose.disconnect(DB_URI);
  });
  test("shold return status 401", async () => {
    const response = await superTest(app).post("/api/users/login").send({
      email: "tes@test.com",
      password: "123123123",
    });
    expect(response.statusCode).toBe(401);
  });

  test("shold return status 200 and return token", async () => {
    const response = await superTest(app).post("/api/users/login").send({
      email: "test3@test.com",
      password: "123123123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe("test3@test.com");
  });
});
