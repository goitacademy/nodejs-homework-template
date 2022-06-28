const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();
const app = require("../app");
const { User } = require("../db/models/usersModel");
const { login } = require("../controllers/auth");

// // ответ должен иметь статус-код 200
// // в ответе должен возвращаться токен
// // в ответе должен возвращаться объект user с 2 полями email и subscription,
// // имеющие тип данных String

describe("test register controller", () => {
  let server;
  beforeAll(() => (server = app.listen(3000)));
  afterAll(() => server.close());

  test("test login route", async () => {
    const newUser = {
      email: "nastia@mail.com",
      password: "123456",
    };

    const user = await User.create(newUser);
  });
});
