const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../../app");
require("dotenv").config();

const { User } = require("../../model/user");
const { DB_TEST_HOST, PORT_TEST } = process.env;

describe("test signup user", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT_TEST)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection("users", () => {
      mongoose.connection.close(() => done());
    });
  });

  it("test is res.code:200", async () => {
    const hashedPassword = await bcrypt.hash("irina2002", 10);

    const newUser = {
      email: "irina@gmail.com",
      password: hashedPassword,
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "irina@gmail.com",
      password: "alex2222",
    };

    const response = await request(app).post("/auth/signup").send(loginUser);

    expect(response.statusCode).toBe(200);
  });

  it("test is token", async () => {
    const hashedPassword = await bcrypt.hash("irina2002", 10);

    const newUser = {
      email: "irina@gmail.com",
      password: hashedPassword,
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "irina@gmail.com",
      password: "irina2002",
    };

    const response = await request(app).post("/auth/signup").send(loginUser);
    const { body } = response;
    expect(body.token).toBeTruthy();
  });

  it("test if token is valid", async () => {
    const hashedPassword = await bcrypt.hash("irina2002", 10);

    const newUser = {
      email: "irina@gmail.com",
      password: hashedPassword,
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "irina@gmail.com",
      password: "irina2002",
    };

    const response = await request(app).post("/auth/signup").send(loginUser);
    const { body } = response;
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });

  it("test is body object", async () => {
    const hashedPassword = await bcrypt.hash("irina2002", 10);

    const newUser = {
      email: "irina@gmail.com",
      password: hashedPassword,
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "irina@gmail.com",
      password: "irina2002",
    };

    const response = await request(app).post("/auth/signup").send(loginUser);
    const { body } = response;

    expect(body.user).toEqual({
      email: "irina@gmail.com",
      subscription: "starter",
    });
  });
  it("test is email string", async () => {
    const hashedPassword = await bcrypt.hash("irina2002", 10);

    const newUser = {
      email: "irina@gmail.com",
      password: hashedPassword,
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "irina@gmail.com",
      password: "irina2002",
    };

    const response = await request(app).post("/auth/signup").send(loginUser);
    const { body } = response;

    const userEmail = body.user.email;
    expect.stringContaining(userEmail);
  });
  it("test is subscription", async () => {
    const hashedPassword = await bcrypt.hash("irina2002", 10);

    const newUser = {
      email: "irina@gmail.com",
      password: hashedPassword,
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "irina@gmail.com",
      password: "irina2002",
    };

    const response = await request(app).post("/auth/signup").send(loginUser);
    const { body } = response;

    const subscriptionType = body.user.subscription;
    expect.stringContaining(subscriptionType);
  });
});
