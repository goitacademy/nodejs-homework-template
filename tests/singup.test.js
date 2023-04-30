/* eslint-disable no-undef */
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const { DB_HOST_TEST, PORT = 3000 } = process.env;

let server = null;

describe("test for login controller", () => {
  beforeAll(() => {
    mongoose
      .connect(DB_HOST_TEST)
      .then(() => {
        server = app.listen(PORT, () => {
          console.log("Database connection successful");
        });
      })
      .catch((error) => {
        mongoose.connection.close();
        console.log(error);
      });
  });

  test("login returns response status 200, response body must contain a token, response body must contain name, email and subscription type ", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "Sveta@gmail.com",
      password: "654321",
    });
    const { token, user } = response.body;
    expect(response.status).toBe(200);
    expect(typeof token).toBe("string");
    expect(typeof user.name).toBe("string");
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });

  afterAll(() => {
    server.close();
    mongoose.connection.close();
  });
});
