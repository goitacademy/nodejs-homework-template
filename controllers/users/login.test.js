/*
 відповідь повина мати статус-код 200
 у відповіді повинен повертатися токен
 у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
*/

// const request = require("supertest");
//  const app = require("../../app");


// describe("POST /users/login", () => {
  // beforeAll(() => {
  //   console.log("before all");
  // });

  // beforeEach(() => {
  //   console.log("before each");
  // });

  // afterEach(() => {
  //   console.log("after each");
  // });

  // afterAll(() => {
  //   console.log("after all");
  // });

//   it("should return login error", async () => {
//     const testData = {
//       email: "test@example.com",
//     };

//     const res = await request(app).post("/users/login").send(testData);

//     expect(res.statusCode).toBe(400);
//   });

//   it("should return unauth error", async () => {
//     const testData = {
//       email: "test@example.com",
//       password: "Pass&1234",
//     };

//     const res = await request(app).post("/users/login").send(testData);

//     expect(res.statusCode).toBe(400);
//   });

//   it("should return token and user", async () => {
//     const testData = {
//       email: "test@example.com",
//       password: "Pass&1234",
//     };

//     const res = await request(app).post("/users/login").send(testData);

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual(
//       expect.objectContaining({
//         token: expect.any(String),
//         user: expect.any(Object),
//       })
//     );
//   });
// });
