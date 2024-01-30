const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

const payload = {
  email: "kyi.profy@gmail.com",
  password: "78963214",
};

beforeEach(async () => {
  await mongoose.connect(process.env.DB_HOST);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /users/login", () => {
  it("should login", async () => {
    const res = await request(app).post("/users/login").send(payload);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toMatchObject({
      user: {
        email: expect.stringMatching(/kyi.profy@gmail.com/),
        subscription: expect.stringMatching(/starter/),
      },
    });
  });
});
