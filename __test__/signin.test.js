const mongoose = require("mongoose");
const app = require("../app");
const supertest = require("supertest");
require("dotenv").config();

const { auth: ctrl } = require("../controllers");
app.use("/api/auth/login", ctrl.signin);

const { DB_HOST } = process.env;

describe("test signup controller", () => {
  beforeAll(async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(DB_HOST);
  });

  it("login", async () => {
    const req = {
      email: "iryna115@gmail.com",
      password: "hgbiebu46vFgc4je",
    };
    const response = await supertest(app).post("/api/auth/login").send(req);

    const { status, message, data } = response.body;
    const { token, userData } = response.body.data;
    const { email, subscription } = response.body.data.userData;

    expect(response.body).toBeDefined();
    expect(status).toBe("OK");
    expect(message).toBe("Login success");
    expect(response.statusCode).toBe(200);
    expect(typeof data).toBe("object");
    expect(token).toBeTruthy();
    expect(userData).toHaveProperty("email");
    expect(userData).toHaveProperty("subscription");
    expect(typeof email).toBe("string");
    expect(typeof subscription).toBe("string");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
