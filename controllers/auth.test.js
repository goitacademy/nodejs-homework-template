const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const request = require("supertest");
// const jest = require("jest");
// jest.setTimeout(6000);

require("dotenv").config();

const app = require("../app");
const { User } = require("../models/user");

const { DB_TEST_HOST, PORT } = process.env;

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => {
    server.close()});

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    },);
  });

  test("test login route", async () => {
    const newUser = {
      email: "testUser@gmail.com",
      password: "654321",
    };

    const user = await request(app).post("/api/users/signup").send(newUser);
    // expect(response.statusCode).toBe(200);
    // const {body} = response;
    // expect(body.token).toByTruthy();
    // const {token} = await User.findById(user._id);
    // expect(body.token).toBe(token);

    /*
        1. Проверить правильность получаемого ответа на 
        AJAX-запрос документации
        2. Проверить что в базу записался нужный элемент.
        */

    const loginUser = {
      email: "testUser@gmail.com",
      password: "654321",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginUser);
    expect(response.statusCode).toBe(200);
    // const {body} = response;
    // expect(body.token).toByTruthy();
    // const {token} = await User.findById(user._id);
    // expect(body.token).toBe(token);
  });
});
