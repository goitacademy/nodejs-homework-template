const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models");
const app = require("../../app");
const { DB_TEST_HOST } = process.env;

describe("test auth", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection("users").then(() => {
      mongoose.connection.db.dropCollection("contacts").then(() => {
        mongoose.connection.close(() => done());
      });
    });
  });

  test("test login route", async () => {
    // для зручності відправляємо запит на створення юзера
    const newUser = {
      name: "Bogdan",
      email: "bogdan123@gmail.com",
      password: "1234567",
    };

    const response = await request(app)
      .post("/api/auth/register")
      .send(newUser);

    console.log("response:", response.statusCode);

    const loginData = {
      email: "bogdan123@gmail.com",
      password: "1234567",
    };

    const response2 = await request(app)
      .post("/api/auth/login")
      .send(loginData);

    console.log("response2: ", response2.body);

    expect(response2.statusCode).toBe(200);
    expect(response2.body.user.token).not.toBe("");

    // перевірка даних з бази
    const user = await User.findOne({ email: response2.body.user.email });
    expect(user).toBeTruthy();
    expect(typeof response2.body.user.email).toBe("string");
    expect(typeof response2.body.user.subscription).toBe("string");
  });
});
