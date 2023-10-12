/* eslint-disable no-undef */
const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");

require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

describe("login", () => {
  let server;

  beforeAll(() => {
    mongoose
      .connect(DB_HOST)
      .then(() => {
        server = app.listen(PORT, () => {});
      })
      .catch(() => {
        process.exit(1);
      });
  });

  afterAll((done) => {
    server.close();
    done();
  });

  test("login with valid body, returns user object and token", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .set("Content-type", "application/json")
      .send({
        email: "foxi@gmail.com",
        password: "1234pol",
      });

    expect(statusCode).toBe(200);
    expect(typeof body.token).toBe("string");
    expect(typeof body.user).toBe("object");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
