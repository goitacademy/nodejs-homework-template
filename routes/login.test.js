const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config();
const { User } = require("../models/user");
const { DB_HOST } = process.env;
let server;

beforeAll(() => (server = app.listen(4000)));
afterAll(() => server.close());

beforeEach((done) => {
  mongoose.connect(DB_HOST).then(() => done());
});

test("login", async () => {
  const newUser = {
    email: "hello@example.com",
    name: "Andrew",
    password: "123456789",
    avatar_url: "asdasdqsdqwdpo",
  };
  const user = await User.create(newUser);
  const login = { email: "hello@example.com", password: "123456789" };

  const response = await request(app).post("/users/login").send(login);
  expect(response.statusCode).toBe(200);
  const { body } = response;
  const { token } = await User.findById(user.id);
  expect(body.token).toBe(token);
});
