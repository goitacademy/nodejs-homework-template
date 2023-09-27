import mongoose from "mongoose";
import app from "../../app.js";
import request from "supertest";
import "dotenv/config.js";
import User from "../../models/user.js";

const { DB_HOST, DB_HOST_TEST, PORT = 3000 } = process.env;

describe("test auth-router login", () => {
  let server = "";
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(() => {});
  afterEach(async () => {
    //   await User.deleteMany();
  });

  test("test login with correct data ", async () => {
    const loginData = {
      email: "nullwa.ante@vestibul.co.uk",
      password: "qweqweqwe",
    };
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(loginData);

    const user = await User.findOne({ email: loginData.email });

    expect(user.email).toBe(loginData.email);
    expect(statusCode).toBe(200);
    expect(body.token).toBe(user.token);
    expect(body.user.email).toBe(loginData.email);
    expect(body.user.subscription).toBe(user.subscription);
  });
});
