/* eslint-disable no-undef */
const request = require("supertest");
const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.BD_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("test for login controller", () => {
  it("POST / => login user", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "alex@mail.com",
      password: "London",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.any(String),
        }),
      })
    );
  });
});
