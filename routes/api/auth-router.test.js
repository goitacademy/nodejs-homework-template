import mongoose from "mongoose";
import app from "../../app.js";
import "dotenv/config.js";
import request from "supertest";
import User from "../../models/User.js";

const { DB_HOST, PORT } = process.env;

describe("test /api/user/login", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test login", async () => {
    const loginData = { email: "anton@mail.com", password: "1234567" };
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);
    expect(statusCode).toBe(200);
    const user = await User.findOne({ email: loginData.email });

    expect(body.token).toBe(user.token);
    expect(body.user).toEqual({
      email: loginData.email,
      subscription: user.subscription,
    });
  });
});
