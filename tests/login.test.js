const { default: mongoose } = require("mongoose");
const app = require("../app");
const users = require("../models/users");
const supertest = require("supertest");
require("dotenv").config();

const DB_TEST_URI = process.env.DB_TEST_URI;
describe("login", function () {
  beforeAll(async () => {
    console.log("Виконати на початку тестів");

    await mongoose.connect(DB_TEST_URI).then(() => {
      console.log("Conection DB cool");
    });

    await users.deleteMany();
  });

  afterAll(() => {
    console.log("Виконати після тестів");
    mongoose.disconnect(DB_TEST_URI);
  });

  //   beforeEach(() => {
  //     console.log("Виконати на початку кожного тесту");
  //   });

  //   afterEach(() => {
  //     console.log("Виконати наприкінці кожного тесту");
  //   });

  test("login", async () => {
    // const { data, status } = await fetch(
    //   "http://localhost:3000/api/users/login",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: "maks.karalash@gmail.com",
    //       password: "12345678",
    //     }),
    //   }
    // ).then((data) => ({ data: data.json(), status: data.status }));

    const res = await supertest(app).post("/api/users/login").send({
      email: "maks.karalash@gmail.com",
      password: "12345678",
    });

    expect(res.statusCode).toBe(200);

    //   await expect(await data).toEqual(
    //     expect.objectContaining({
    //       user: expect.objectContaining({
    //         email: expect.any(String),
    //         subscription: expect.any(String),
    //         token: expect.any(String),
    //       }),
    //     })
    //   );
  });
});
