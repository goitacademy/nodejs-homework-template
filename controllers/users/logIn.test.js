const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../../app");
const { logIn } = require("./index");

require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

describe("logIn controller test", () => {
  let server;

  beforeAll(() => {
    mongoose
      .connect(DB_HOST)
      .then(() => {
        server = app.listen(PORT, () => {});
      })
      .catch(() => {
        process.exit(1);
      });
  });

  afterAll((done) => {
    mongoose.disconnect(done);
    server.close();
  });

  test("logIn status 200", async () => {
    const { status } = await request(app)
      .post("/api/users/login")
      .set("Content-type", "application/json")
      .send({
        email: "serg1111@gmail.com",
        password: "1234561",
      });

    expect(status).toBe(200);
  });

  test("logIn token", async () => {
    const {
      body: {
        data: { token },
      },
    } = await request(app)
      .post("/api/users/login")
      .set("Content-type", "application/json")
      .send({
        email: "serg1111@gmail.com",
        password: "1234561",
      });
    expect(typeof token).toBe("string");
  });

  test("logIn email/subscription", async () => {
    const {
      body: {
        data: { user },
      },
    } = await request(app)
      .post("/api/users/login")
      .set("Content-type", "application/json")
      .send({
        email: "serg1111@gmail.com",
        password: "1234561",
      });

    expect(typeof user.email).toBe("string");
    expect(typeof user.subscription).toBe("string");
  });
});
