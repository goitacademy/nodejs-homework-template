const express = require("express");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = process.env;

const login = require("./login");

const { User } = require("../../models/user");

const app = express();
app.use(express.json());

describe("test login controller", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  test("check status, token, type of data params", async () => {
    const mEmail = "kristuwa15@test.com";
    const mPassword = "test";

    const user = {
      password: bcrypt.hashSync(mPassword, bcrypt.genSaltSync(10)),
      email: mEmail,
      avatarURL: "service-desktop-05.jpg",
    };

    const mReq = {
      body: { email: mEmail, password: mPassword },
    };

    const mRes = { json: jest.fn() };

    await jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);

    login(mReq, mRes).then(() => {
      console.log(mRes);
      expect(mRes.status).toBe(200);
      expect(mRes.data.token).toBeDefined();
      expect(typeof mRes.data.user.email).toBe("string");
      expect(typeof mRes.data.user.subscription).toBe("string");
    });
  });
});
