/* 
1. Response must have status 200
2. Response must return the token
3. Response must return an object with 2 fields: "email" & "subscription" with type of data String
*/

import app from "../app.js";
import request from "supertest";
import mongoose from "mongoose";
import { response } from "express";

const { DB_HOST, PORT } = process.env;

const registerData = {
  email: "cherkashyna.n1@gmail.com",
  password: "qweqwe",
};

describe("test /users/login route", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  // test("/users/register with correct data", async () => {
  //   const { body, statusCode } = await request(app)
  //     .post("/users/register")
  //     .send(registerData);

  //   expect(statusCode).toBe(201);
  //   expect(body.email).tobe(registerData.email);
  //   expect(body.password).toBe(registerData.password);

  //   const user = await User.findOne({ email: registerData.email });
  //   expect(user.email).tobe(registerData.email);
  //   expect(user.password).toBe(registerData.password);
  // });

  it("Should return statusCode 200", async () => {
    const { statusCode } = await request(app)
      .post("/users/login")
      .send(registerData);
    expect(statusCode).toBe(200);
  });

  it("Should return token", async () => {
    const { body } = await request(app).post("/users/login").send(registerData);
    expect(body.token).toBeDefined();
  });

  it("Should return an object with 2 fields and type String", async () => {
    const { body } = await request(app).post("/users/login").send(registerData);
    expect(body.user).toEqual({
      email: body.user.email,
      subscription: body.user.subscription,
    });
  });

  it("Filds should be string", async () => {
    const { body } = await request(app).post("/users/login").send(registerData);
    expect(typeof body.user.email === "string").toBe(true);
    expect(typeof body.user.subscription === "string").toBe(true);
  });
});
