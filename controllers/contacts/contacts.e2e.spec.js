import { jest } from "@jest/globals";
import express from "express";
import request from "supertest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../lib/db";
import router from "../../routes/api/contacts";
import User from "../../model/user";

const app = express();
app.use(express.json());
app.use("/api/contacts", router);

const mockUser = {
  email: "master@gmail.com",
  password: "12345678",
};

describe("Tes contacts", () => {
  let user, token;
  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: mockUser.email });
    user = await User.create(mockUser);
    const secret = process.env.JWT_SECRET_KEY;
    const issueToken = (payload, secret) => jwt.sign(payload, secret);
    token = issueToken({ id: user.id }, secret);
    await User.updateOne({ _id: user.id }, { token });
  });
  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: mockUser.email });
    mongo.disconnect();
  });
  test("Get all contacts", async () => {
    const response = await request(app)
      .get("/api/contacts")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.data.contacts).toBeInstanceOf(Array);
  });
});
