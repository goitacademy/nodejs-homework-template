// // відповідь повина мати статус-код 200
// // у відповіді повинен повертатися токен
// // у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

// // "abc@gmail.com", "12345Qwerty" - status 200, token is string and not empty, user === {"email": "abc@gmail.com", "subscription": "starter"}
// const { default: mongoose } = require("mongoose");
// const mogoose = require("mongoose");
// const request = require("supertest");
// const User = require("../../models/users");
// require("dotenv").config();
// const registerUser = require("./registerUser");

// describe("test loginUser", () => {
//   let server;
//   beforeAll(() => (server = app.listen(3000)));
//   afterAll(() => server.close());

//   beforeEach((done) => {
//     mongoose.connect(DB_TEST_HOST).then(() => done());
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropcollection(() => {
//       mongoose.Collection.close(() => done());
//     });
//   });

//   test("test login route", async () => {
//     const newUser = {
//       email: "testUser@gmail.com",
//       password: "Qwerty123456",
//     };
//     const user = await User.create(newUser);

//     const loginUser = {
//       email: "testUser@gmail.com",
//       password: "Qwerty123456",
//     };
//     const response = await request(app).post("/api/auth/login").send(loginUser);

//     expect(response.statusCode).toBe(200);
//     const { body } = response;
//     expect(body.token).toBeTruthy();
//     const token = await User.findById(user._id);
//     expect(body.token).toBe(token);
//   });
// });
