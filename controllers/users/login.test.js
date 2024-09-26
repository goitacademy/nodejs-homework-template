const express = require("express");
const bcrypt = require("bcrypt");
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
    const myEmail = "Marchenco@test.com";
    const myPassword = "test";

    const user = {
      password: bcrypt.hashSync(myPassword, bcrypt.genSaltSync(10)),
      email: myEmail,
      avatarURL: "service-desktop-05.jpg",
    };

    const myReq = {
      body: { email: myEmail, password: myPassword },
    };

    const myRes = { json: jest.fn() };

    await jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);

    login(myReq, myRes).then(() => {
      console.log(myRes);
      expect(myRes.status).toBe(200);
      expect(myRes.data.token).toBeDefined();
      expect(typeof myRes.data.user.email).toBe("string");
      expect(typeof myRes.data.user.subscription).toBe("string");
    });
  });
});