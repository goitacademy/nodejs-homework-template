// відповідь повина мати статус-код 200
// у відповіді повинен повертатися токен
// у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String

// const login = require("./login");

// describe("test login controller", () => {
//   test("respond.status = 200", () => {
//     // const result = login(res.status = 200)
//     // expect()
//   });
// });

// -------------------------------------------------
// const jwt = require('jsonwebtoken');
// const app = require('./app'); // Припустимо, що ваш контролер входу експортується через app
// const request = require('supertest');

// describe('Login Controller', () => {
//   test('метод loginUser повертає статус-код 200', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send({ email: 'example@example.com', password: 'password123' });

//     expect(response.status).toBe(200);
//   });

//   test('метод loginUser повертає токен', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send({ email: 'example@example.com', password: 'password123' });

//     expect(response.body.token).toBeDefined();
//   });

//   test('метод loginUser повертає об\'єкт з полями email та subscription типу String', async () => {
//     const response = await request(app)
//       .post('/login')
//       .send({ email: 'example@example.com', password: 'password123' });

//     expect(response.body.user).toBeDefined();
//     expect(response.body.user.email).toEqual(expect.any(String));
//     expect(response.body.user.subscription).toEqual(expect.any(String));
//   });
// });
