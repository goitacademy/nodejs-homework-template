const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const app = require("../app");
const { User } = require("../models/user");
const { DB_TEST_HOST } = process.env;

// // ответ должен иметь статус-код 200
// // в ответе должен возвращаться токен
// // в ответе должен возвращаться объект user с 2 полями email и subscription,
// // имеющие тип данных String

describe("test register controller", () => {
  let server;
  beforeAll(() => (server = app.listen(3001)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  it("should return response with status code 200 containing token, user.email and user.subscription", async () => {
    const hashPassword = await bcrypt.hash("123456", 10);

    const newUser = {
      email: "nastia@mail.com",
      password: hashPassword,
      avatarURL: "//www.gravatar.com/avatar/d0ab671f775f7eba1d8f25c98a25effb",
      token: "1234567",
    };

    const createdUser = await User.create(newUser);

    const loginUser = {
      email: "nastia@mail.com",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);

    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toBeTruthy();
    const { token } = await User.findById(createdUser._id);
    expect(body.token).toBe(token);
    expect(body.user).toBeTruthy();
    expect(body.user).toMatchObject({
      email: expect.stringMatching(loginUser.email),
      subscription: expect.stringMatching(/starter|pro|business/),
    });
  });

  it("should return response with status code 401 and error 'Email or password is wrong' if there is no such user in the db", async () => {
    const loginUser = {
      email: "nastia5@mail.com",
      password: "123456",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    const { body } = response;

    expect(response.statusCode).toBe(401);
    expect(body.message).toBe("Email or password is wrong");
  });

  it("should return response with status code 400 and error 'missing required fields' if there email was not passed", async () => {
    const hashPassword = await bcrypt.hash("123456", 10);

    const newUser = {
      email: "nastia@mail.com",
      password: hashPassword,
      avatarURL: "//www.gravatar.com/avatar/d0ab671f775f7eba1d8f25c98a25effb",
      token: "1234567",
    };

    await User.create(newUser);

    const loginUser = {
      password: "123456",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("missing required fields");
  });

  it("should return response with status code 400 and error 'missing required fields' if there password was not passed", async () => {
    const hashPassword = await bcrypt.hash("123456", 10);

    const newUser = {
      email: "nastia@mail.com",
      password: hashPassword,
      avatarURL: "//www.gravatar.com/avatar/d0ab671f775f7eba1d8f25c98a25effb",
      token: "1234567",
    };

    await User.create(newUser);

    const loginUser = {
      email: "nastia@mail.com",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    const { body } = response;

    expect(response.statusCode).toBe(400);
    expect(body.message).toBe("missing required fields");
  });
});
