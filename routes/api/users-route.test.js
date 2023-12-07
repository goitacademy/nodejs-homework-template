import mongoose from "mongoose";
import app from "../../app.js";
import request from "supertest";

const { DB_TEST_HOST, PORT = 300 } = process.env;

describe("test /users", () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close(server);
    server.close();
  });

  test("test /login with correctData", async () => {
    const corectData = { email: "email@test.com", password: "12345678" };
    const {
      statusCode,
      body: { user, token },
    } = await request(app).post("/users/login").send(corectData);

    expect(statusCode).toBe(200);
    expect(user).toEqual({
      email: expect.any(String),
      subscription: expect.any(String),
    });
    expect(token);
  });
});
