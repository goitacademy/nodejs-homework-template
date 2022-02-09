const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();

const { DB_HOST_TEST } = process.env;
const { User } = require("../../src/models");

const app = require("../../app");

describe("test auth", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST_TEST).then(() => done());
  });
  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login route", async () => {
    const loginDate = {
      name: "Ir",
      email: "Ir@gmail.com",
      password: "123456",
      subscription: "starter",
    };
    const response = await request(app)
      .post("/api/auth/users/login")
      .send(loginDate);

    //   check response
    expect(response.statusCode).toBe(200);

    expect(response.body.token).toBeTruthy();

    // check data in database
    const user = await User.findById(response.body._id);
    expect(user.name).toBe(loginDate.name);
    expect(user.email).toBe(loginDate.email);
    expect(user.subscription).toBe(loginDate.subscription);
  });
});
