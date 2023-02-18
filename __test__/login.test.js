const mongoose = require("mongoose");
const app = require("../app.js");
const supertest = require("supertest");
require("dotenv").config();

const { auth: ctrl } = require("../src/controllers");
app.use("/api/users/login", ctrl.login);

const { DB_HOST } = process.env;

describe("test signup controller", () => {
  beforeAll(async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(DB_HOST);
    console.log("Data base connected");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("login", async () => {
    const req = {
      email: "user@gmail.com",
      password: "1111",
    };
    const response = await supertest(app).post("/api/users/login").send(req);
    const { email, subscription } = response.body.data.user;
    const { token } = response.body.data;
    expect(response.statusCode).toBe(200);
    expect(token).not.toBe(null);

    const result = {
      statusCode: response.statusCode,
      token: token,
      user: {
        email: email.toString(),
        subscription: subscription.toString(),
      },
    };
    console.log(result);
  });
});
