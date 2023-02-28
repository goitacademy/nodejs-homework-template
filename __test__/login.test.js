const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../app");
const { login } = require("../controllers/auth");

mongoose.set("strictQuery", false);

describe("Test login controller", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_HOST);
    console.log("Test database connection successful");
  });

  afterAll(async () => {
    await mongoose.disconnect(process.env.DB_HOST);
  });

  test("login return status 200", async () => {
    const response = await request(app)
      .post("/api/users/login", login)
      .send({ email: "polly@ukr.net", password: "211212" });
    //console.log(response.body.data);

    const { token, user } = response.body.data;
    const userExample = {
      email: "polly@ukr.net",
      subscription: "starter",
    };
    //console.log(token);
    //console.log(user);
    expect(response.status).toEqual(200);
    expect(token).toBeDefined();
    expect(typeof user).toBe("object");
    expect(user).toMatchObject(userExample);
    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});