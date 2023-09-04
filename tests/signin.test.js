// const Jest = require("jest");
const express = require("express");
const request = require("supertest");
const { getAll } = require("../controllers/contacts");
const { login } = require("../controllers/auth");
const mongoose = require("mongoose");
// const app = require("../app");

require("dotenv").config();

const app = express();

app.post("/api/users/login", login);

beforeEach(async () => {
  await mongoose.connect(process.env.DB_HOST);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/users/login", () => {
  //   beforeAll(() => app.listen(3000));
  //   afterAll(() => app.close());
  test("return email and subscibe test", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "testuser@mail.com",
      password: "123456",
    });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});
