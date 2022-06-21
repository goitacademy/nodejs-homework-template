import express from "express";
import request from "supertest";
import dotenv from "dotenv";
import models from "../../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const { userModel } = models;
const { User } = userModel;

dotenv.config();
const { DB_HOST, SECRET_KEY, PORT = 3000 } = process.env;

const app = express();
const server = app.listen(PORT);

mongoose
  .connect(DB_HOST)
  .then(() => {
    // app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

const login = async ({ email = "zz@mail.com", password = "123456" }, res) => {
  const user = await User.findOne({ email });
  const { subscription } = user;

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).send({
    status: "success",
    code: 200,
    message: "Welcome!",
    data: {
      token,

      user: {
        email: email,
        subscription: subscription,
      },
    },
  });
};

app.post("/api/users/login", login);

describe("Test login controller", () => {
  // beforeAll(() => server);
  // afterAll(() => server.close());

  test("login return status 200", async () => {
    const response = await request(app).post("/api/users/login");
    console.log("Status: ", response.status);
    expect(response.status).toBe(200);
  });

  test("login return token", async () => {
    const response = await request(app).post("/api/users/login");
    const token = response.body.data.token;
    console.log("Token: ", token);
    expect(token !== "").toBe(true);
  });

  test("login return user object with keys email and subscription", async () => {
    const response = await request(app).post("/api/users/login");
    const user = response.body.data.user;
    const { email, subscription } = user;
    console.log("Email: ", email);
    console.log("Subscription: ", subscription);
    expect(typeof email).toBe("string");
    expect(typeof subscription).toBe("string");
  });
});
