const request = require("supertest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const mongoose = require("mongoose");
const app = require("../app");

const { User } = require("../src/models");
require("dotenv").config();

const { SECRET_KEY, DB_HOST } = process.env;

const { auth: ctrl } = require("../src/controllers");
app.use("/api/users/login", ctrl.login);

describe("test signup controller", () => {
  beforeAll(async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_HOST);
    const newUser = new User(mockUser);
    await newUser.save();
  });

  afterAll(async () => {
    await User.deleteMany({ email: /test@mail.com/ });
    await mongoose.disconnect();
  });

  function reqLogin(email, password) {
    return request(app).post("/api/users/login").send({ email, password });
  }

  const id = new mongoose.Types.ObjectId();
  const testEmail = "test@mail.com";
  const testPassword = "test";
  const verify = "true";
  const verificationToken = "testToken";

  const mockUser = {
    _id: id,
    email: testEmail,
    subscription: "starter",
    token: jwt.sign({ _id: id }, SECRET_KEY),
    password: bcrypt.hashSync(testPassword, bcrypt.genSaltSync(10)),
    avatarURL: gravatar.url(testEmail),
    verify: verify,
    verificationToken: verificationToken,
  };

  it("response has 200 status code", async () => {
    const response = await reqLogin(testEmail, testPassword);
    console.log(response.statusCode);
    expect(response.statusCode).toBe(200);
  });
  it("response has a token", async () => {
    const response = await reqLogin(testEmail, testPassword);
    const { token } = response.body.data;
    console.log(token);
    expect(token).not.toBeNull();
  });
  it("response has an object `user`", async () => {
    const response = await reqLogin(testEmail, testPassword);
    console.log(response.body.data.user);
    expect(response.body.data.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});
