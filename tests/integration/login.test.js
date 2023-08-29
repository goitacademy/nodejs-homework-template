require("dotenv").config();
const jwt = require("jsonwebtoken");

const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const { User } = require("../../models/user");

mongoose.set("strictQuery", false);

const { DB_TEST_URI } = process.env;
const { SECRET_KEY } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URI);
  });

  it("should register new user", async () => {
    const response = await supertest(app).post("/api/users/register").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(201);

    expect(response._body.email).toBe("testUser1@gmail.com");
  });

  it("should login new user", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "testUser1@gmail.com",
      password: "123456",
    });
    const userData = {
      email: "testUser1@gmail.com",
      password: "123456",
    };
    const user = await User.findOne({ email: userData.email });
    console.log("qweqweqwe", user);

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    const userToken = await User.findByIdAndUpdate(user._id, { token });

    expect(response.statusCode).toBe(200);

    expect(userToken.token).toBe(token);
    expect(userToken.email).toBe("testUser1@gmail.com");
    expect(userToken.subscription).toBe("starter" || "pro" || "business");
  });
});
