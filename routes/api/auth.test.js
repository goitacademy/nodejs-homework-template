// const request = require('supertest');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const app = require('../../app');

// const { DB_TEST_HOST } = process.env;

// describe("test auth", () => {
//     let server;
//     beforeAll(() => (server = app.listen(3000)));
//     afterAll(() => server.close());

//     beforeEach((done) => {
//         mongoose.connect(DB_TEST_HOST).then(() => done())
//     });

//     afterEach((done) => {
//         mongoose.connection.db.dropCollection('users').then(() => {
//             mongoose.connection.db.dropCollection('contacts').then(() => {
//                 mongoose.connection.close(() => done())
//             })
//         })
//     });

//     test('test login route', async () => {
//         const loginData = {
//             email: 'vlad@gmail.com',
//             password: '123456',
//         }

//         await request(app).post('/api/users/signup').send(loginData)
//         const response = await request(app).post('/api/users/login').send(loginData)

//         expect(response.statusCode).toBe(200)
//     });
// })

