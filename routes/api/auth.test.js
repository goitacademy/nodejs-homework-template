require("dotenv").config();

const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const User = require("../../models/users");

const { DB_HOST } = process.env;

describe("test user login", () => {
  let server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    await mongoose.connect(DB_HOST);
  });

  //   afterEach((done) => {
  //     mongoose.connection.db.dropCollection(() => {
  //       mongoose.connection.close(() => done());
  //     });
  //   });

  test("user login", async () => {
    const newUser = {
      email: "test5@gmail.com",
      password: "$2a$10$GBvupyO5n52JUa6SvLxQMO3fFZ11v0oIQhSvxgSVTP./BUGE8wJK6",
      subscription: "pro",
      avatarURL:
        "https://s.gravatar.com/avatar/58090ea9184cf410bac8ee57bc5f985f",
    };

    const user = await User.create(newUser);

    const userLogin = {
      email: "test5@gmail.com",
      password: "123456",
    };
    const response = await request(app)
      .post("/api/users/login")
      .send(userLogin);

    expect(response.statusCode).toEqual(200);

    const { token } = response.body;

    expect(token).toEqual(expect.any(String));

    const userFromDb = await User.findById(user._id);

    expect(userFromDb.token).toEqual(token);
  });
});
