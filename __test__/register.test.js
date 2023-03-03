const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

const { DB_HOST } = process.env;

describe("test register controller", () => {
  let server;
  beforeAll(() => {
    mongoose
      .connect(DB_HOST)
      .then(() => {
        server = app.listen(3001);
      })
      .catch((err) => {
        console.log(err.message);
        process.exit(1);
      });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
    server.close();
  });

  test("register success", async () => {
    const {
      status,
      body: {
        data: { user, token },
      },
    } = await request(app)
      .post("/api/auth/register")
      .set("Content-type", "application/json")
      .send({
        name: "Mamam",
        email: "mamam@gmail.com",
        password: "123456",
      });

    expect(status).toBe(201);

    expect(typeof user).toBe("object");
    expect(typeof user.name).toBe("string");
    expect(typeof user.email).toBe("string");
    expect(typeof token).toBe("string");
  });

  test("register without name", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .post("/api/auth/register")
      .set("Content-type", "application/json")
      .send({
        email: "mamam@gmail.com",
        password: "123456",
      });

    expect(status).toBe(400);
    expect(message).toBe('"name" is required');
  });

  test("register without password", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .post("/api/auth/register")
      .set("Content-type", "application/json")
      .send({
        email: "mamam@gmail.com",
        name: "Mamam",
      });

    expect(status).toBe(400);
    expect(message).toBe('"password" is required');
  });

  test("register without  email", async () => {
    const {
      status,
      body: { message },
    } = await request(app)
      .post("/api/auth/register")
      .set("Content-type", "application/json")
      .send({
        name: "Mamam",
        password: "123456",
      });

    expect(status).toBe(400);
    expect(message).toBe('"email" is required');
  });
});
