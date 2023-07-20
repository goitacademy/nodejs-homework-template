require("dotenv").config();
const mongoose = require("mongoose");
const app = require("../app");
const testRequire = require("supertest");
const { expect, it, describe, beforeAll, afterAll } = require("@jest/globals");

const { DB_HOST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST)
      .then((x) => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it("should login user", async () => {
    const response = await testRequire(app).post("/api/users/login").send({
      email: "v.derkach@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe("v.derkach@gmail.com");
    expect(response.body.user.subscription).toBe("pro");
  });

  it("No body", async () => {
    const response = await testRequire(app).post("/api/users/login").send();

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("missing fields");
  });

  it("Email or password invalid", async () => {
    const response = await testRequire(app).post("/api/users/login").send({
      email: "v.derkaach@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Email or password invalid");
  });

  it('"password" is required', async () => {
    const response = await testRequire(app).post("/api/users/login").send({
      email: "v.derkach@gmail.com",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('"password" is required');
  });

  it('"email" is required', async () => {
    const response = await testRequire(app).post("/api/users/login").send({
      password: "123456",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('"email" is required');
  });

  afterAll(async () => {
    await mongoose
      .disconnect(DB_HOST)
      .then(() => {
        console.log("Database disconnect successful");
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
