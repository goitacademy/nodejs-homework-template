const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../../app");
require("dotenv").config();

const { User } = require("../../service");
const { DB_TEST_HOST, PORT_TEST } = process.env;

// eslint-disable-next-line no-undef
describe("test login user", () => {
  let server;
  // eslint-disable-next-line no-undef
  beforeAll(() => (server = app.listen(PORT_TEST)));
  // eslint-disable-next-line no-undef
  afterAll(() => server.close());

  // eslint-disable-next-line no-undef
  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });
  // eslint-disable-next-line no-undef
  afterEach((done) => {
    mongoose.connection.db.dropCollection("users", () => {
      mongoose.connection.close(() => done());
    });
  });
  // eslint-disable-next-line no-undef
  it("test res.code:200", async () => {
    const hashPassword = await bcrypt.hash("alex2222", 10);
    const newUser = {
      email: "alex@gmail.com",
      password: hashPassword,
    };
    await User.create(newUser);
    const loginUser = {
      email: "alex@gmail.com",
      password: "alex2222",
    };
    const response = await request(app).post("/users/login").send(loginUser);
    // eslint-disable-next-line no-undef
    expect(response.statusCode).toBe(200);
  });
  // eslint-disable-next-line no-undef
  it("test is token", async () => {
    const hashPassword = await bcrypt.hash("alex2222", 10);
    const newUser = {
      email: "alex@gmail.com",
      password: hashPassword,
    };
    await User.create(newUser);
    const loginUser = {
      email: "alex@gmail.com",
      password: "alex2222",
    };
    const response = await request(app).post("/users/login").send(loginUser);
    const { body } = response;
    // eslint-disable-next-line no-undef
    expect(body.token).toBeTruthy();
  });
  // eslint-disable-next-line no-undef
  it("test is token valid", async () => {
    const hashPassword = await bcrypt.hash("alex2222", 10);
    const newUser = {
      email: "alex@gmail.com",
      password: hashPassword,
    };
    const user = await User.create(newUser);
    const loginUser = {
      email: "alex@gmail.com",
      password: "alex2222",
    };
    const response = await request(app).post("/users/login").send(loginUser);
    const { body } = response;
    const { token } = await User.findById(user._id);
    // eslint-disable-next-line no-undef
    expect(body.token).toBe(token);
  });
  // eslint-disable-next-line no-undef
  it("test is body object", async () => {
    const hashPassword = await bcrypt.hash("alex2222", 10);
    const newUser = {
      email: "alex@gmail.com",
      password: hashPassword,
    };
    await User.create(newUser);
    const loginUser = {
      email: "alex@gmail.com",
      password: "alex2222",
    };
    const response = await request(app).post("/users/login").send(loginUser);
    const { body } = response;
    // eslint-disable-next-line no-undef
    expect(body.user).toEqual({
      email: "alex@gmail.com",
      subscription: "starter",
    });
  });
  // eslint-disable-next-line no-undef
  it("test is email string", async () => {
    const hashPassword = await bcrypt.hash("alex2222", 10);
    const newUser = {
      email: "alex@gmail.com",
      password: hashPassword,
    };
    await User.create(newUser);
    const loginUser = {
      email: "alex@gmail.com",
      password: "alex2222",
    };
    const response = await request(app).post("/users/login").send(loginUser);
    const { body } = response;
    const resEmail = body.user.email;
    // eslint-disable-next-line no-undef
    expect.stringContaining(resEmail);
  });
  // eslint-disable-next-line no-undef
  it("test is  subscription string", async () => {
    const hashPassword = await bcrypt.hash("alex2222", 10);
    const newUser = {
      email: "alex@gmail.com",
      password: hashPassword,
    };
    await User.create(newUser);
    const loginUser = {
      email: "alex@gmail.com",
      password: "alex2222",
    };
    const response = await request(app).post("/users/login").send(loginUser);
    const { body } = response;
    const resSubscription = body.user.subscription;
    // eslint-disable-next-line no-undef
    expect.stringContaining(resSubscription);
  });
});
