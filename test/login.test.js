const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const { DB_HOST } = process.env;

const app = require("../app");

describe(
  "The test must:\n" +
    "1) Conect to mongodb and run the server\n" +
    "2) Send login data\n" +
    "3) Get response with statusCode 200\n" +
    "4) Get user token\n" +
    "5) Response should return a login user object",
  () => {
    let server;
    beforeAll(() => (server = app.listen(3000)));
    afterAll(() => server.close());

    beforeEach((done) => {
      mongoose.connect(DB_HOST).then(() => done());
    });

    afterEach((done) => {
      mongoose.connection.close(() => done());
    });

    test("test login route", async () => {
      const loginDate = {
        email: "protsiof@gmail.com",
        password: "1111e411",
      };
      const responseAfterLogin = await request(app)
        .post("/api/auth/login")
        .send(loginDate);

      expect(responseAfterLogin.statusCode).toBe(200);
      expect(responseAfterLogin.body.data.token).toBeTruthy();
      expect(responseAfterLogin.body.user.name).toBeTruthy();
      expect(responseAfterLogin.body.user.email).toBeTruthy();
      expect(responseAfterLogin.body.user.subscription).toBeTruthy();

      console.log(responseAfterLogin.body);
    });
  }
);
