const { login } = require("./auth");
const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");
const User = require("../models/user");

const { PORT, DB_HOST_TEST } = process.env;

describe("test login function", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  const userData = {
    email: "bookbook@book.com",
    password: "12345678",
  };

  beforeEach(async () => {
    await request(app).post("/auth/register").send(userData);
  });

  test("test correct login data", async () => {
    const { body, statusCode } = await request(app)
      .post("/auth/login")
      .send(userData);

    expect(statusCode).toBe(200);

    expect(body.token).toBeDefined();
    expect(body.user).toBeDefined();
    expect(body.user.email).toBe(userData.email);
    expect(body.user.subscription).toBe(userData.email);
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");

    const user = await User.findOne({ email: userData.email });
    expect(user.email).toBe(userData.email);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });
});
