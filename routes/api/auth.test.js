const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../../app");
const { User } = require("../../models/user");

const { DB_HOST } = process.env;

describe("test login rout", () => {
  let server;
  beforeAll(() => (server = app.listen(4000)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  test("login", async () => {
    const newUser = {
      email: "kseniia@gmail.com",
      name: "Kseniia",
      password: "123456",
      avatar_url: "sdfdfkhfh",
    };

    const user = await User.create(newUser);

    const login = {
      email: "kseniia@gmail.com",
      password: "123456",
    };

    const response = await request(app).post("/api/login").send(login);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
