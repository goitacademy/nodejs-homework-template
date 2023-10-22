import mongoose from "mongoose";
import request  from "supertest";
import app from "../../app.js";
import { User } from "../../models/User.js";

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  })
  afterAll(async() => {
    await mongoose.connection.close();
    server.close();
  })
  test("login with correct data", async () => {
    const loginData = {
      email: "qwerty@mail.com",
      password: "12345678",
    }
    const { statusCode, body } = await request(app).post("/api/users/login").send(loginData);
    expect(statusCode).toBe(200);
    expect(body.user.email).toBe(loginData.email)
    expect(body.user.subscription).toBeDefined();
    const user = await User.findOne({ email: body.user.email })
    expect(body.token).toBe(user.token);
  })
})