const app = require("../../app");
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST, PORT = 5000 } = process.env;

const logIn = require("./logIn");
const request = require("supertest");
const { expect } = require("@jest/globals");

describe("test logIn function", () => {
  let server;
  let response;
  beforeAll(() =>
    mongoose
      .connect(DB_HOST)
      .then(() => {
        server = app.listen(PORT);
      })
      .catch(() => {
        process.exit(1);
      })
  );
  afterAll(() =>
    mongoose.disconnect(DB_HOST).then(() => {
      server.close();
    })
  );
  beforeEach(async () => {
    response = await request(app).post("/users/login").send({
      email: "example2@example.com",
      password: "examplepassword",
    });
  });

  test("status(200)", async () => {
    expect(response.status).toBe(200);
  });
  test("get token", async () => {
    const { token } = response.body;
    expect(token).toBeTruthy();
  });
  test("get body user&email string", async () => {
    const { user } = response.body;
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
