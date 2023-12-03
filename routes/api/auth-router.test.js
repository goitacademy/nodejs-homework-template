import mongoose from "mongoose";

import app from "../../app.js";
import request from "supertest";
import User from "../../models/User.js";

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test /api/users/login route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  test("test /api/users/login with correctData", async () => {
    const loginData = {
      email: "asdf5@gmail.com",
      password: "74125896",
    };

    await request(app).post("/api/users/register").send(loginData);

    const { body, statusCode } = await request(app)
      .post("/api/users/login")
      .send(loginData);
    expect(statusCode).toBe(200);
    expect(body.token).toBeDefined();
    expect(body.user).toBeDefined();

    expect(body.user.email).toBe(loginData.email);

    const user = await User.findOne({ email: loginData.email });
    expect(user.email).toBe(loginData.email);
  });
});
