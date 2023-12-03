/*
- відповідь повина мати статус-код 200
- у відповіді повинен повертатися токен
- у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String String
*/

import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";

mongoose.set("strictQuery", true);

const { DB_HOST } = process.env;

const testLogin = {
  email: "EVHEN2@qwq.com",
  password: "895785",
};

describe("test login controller", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(DB_HOST);
      app.listen(3000);
    } catch (error) {
      process.exit(1);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  let res;

  beforeEach(async () => {
    res = await request(app).post("/users/login").send(testLogin);
  });

  test("status - 200", async () => {
    expect(res.status).toBe(200);
  });

  test("token - recived", async () => {
    expect(res.body.token).toBeDefined();
  });

  test("obj user - recived", async () => {
    expect(res.body.user).toBeDefined();
  });

  test("user.email - recived", async () => {
    expect(res.body.user.email).toBeDefined();
  });

  test("user.email - String", async () => {
    const email = res.body.user.email;
    expect(typeof email === "string").toBe(true);
  });

  test("user.subscription - recived", async () => {
    expect(res.body.user.subscription).toBeDefined();
  });

  test("user.subscription - String", async () => {
    const subscription = res.body.user.subscription;
    expect(typeof subscription === "string").toBe(true);
  });
});
