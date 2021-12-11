/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable semi */

// const express = require("express");
// const app = express();
const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");

const { PORT = 3000, DB_HOST } = process.env;
const login = require("./login");

app.post("/api/auth/login", login);

describe("test login controller", () => {
  beforeAll(() => {
    mongoose.connect(DB_HOST).then(() => {
      app.listen(PORT);
    });
  });
  // afterAll(() => app.close());

  test("login return code-status 201", async () => {
    const response = await await request(app).post("/api/auth/login").type("json").send({
      email: "max@ukr.net",
      password: "123456789",
    });
    expect(response.status).toBe(201);
    const { email, token } = response.body.data;
    const tokenLength = token.length > 0;
    expect(typeof email).toBe("string");
    expect(tokenLength).toBe(true);
  });
});
