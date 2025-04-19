const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user");
const request = require("supertest");
const app = require("../app");

describe("POST /users/login", () => {
  let user;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect("mongodb://localhost:27017/testdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    const hashedPassword = await bcrypt.hash("password123", 10);
    user = await User.create({
      email: "test@example.com",
      password: hashedPassword,
      subscription: "starter",
    });
  });

  afterAll(async () => {
    await User.deleteMany({});

    await mongoose.connection.close();
  });

  it("should return a token and user object on successful login", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({ email: "test@example.com", password: "password123" });
    console.log("Response:", response.body);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toHaveProperty("email", "test@example.com");
    expect(response.body.user).toHaveProperty("subscription", "starter");
  });

  it("should return 401 if email or password is incorrect", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Email or password is wrong");
  });

  it("should return 400 if email or password is missing", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({ email: "test@example.com" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"password" is required');
  });
});
