const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { DB_HOST, TEST_PORT, SECRET_KEY } = process.env;

describe("Sign In Controller", () => {
  let server;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(TEST_PORT);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    server.close();
  });

  test("test login data", async () => {
    const reqBody = {
      email: "test@gmail.com",
      password: "123456",
    };

    const { body } = await request(app)
      .post("/api/users/login")
      .send(reqBody)
      .expect(200);

    expect(body).toHaveProperty("token");
    expect(body.user.email).toBe(reqBody.email);
    expect(body.user.subscription).toBe("starter");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");

    const { token } = body;
    const decoded = jwt.verify(token, SECRET_KEY);
    expect(decoded.id).toBeDefined();
    expect(mongoose.Types.ObjectId.isValid(decoded.id)).toBe(true);
  });

  test("test incorrect login data", async () => {
    const reqBody = {
      email: "incorrect@gmail.com",
      password: "incorrect",
    };

    const res = await request(app)
      .post("/api/users/login")
      .send(reqBody)
      .expect(401);

    expect(res.body).toHaveProperty("message", "Email or password invalid");
  });
});
