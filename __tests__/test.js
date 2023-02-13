// const request = require('supertest');
// const path = require('path');
// const mongoose = require('mongoose').set(
//   'strictQuery',
//   true
// );
// const app = require('../app');
// const { User } = require('../models/user');
// // const bcrypt = require('bcryptjs');

// require('dotenv').config({
//   path: path.join(__dirname, '..', 'config', '.env'),
// });

// const { DB_HOST, PORT = 3000 } = process.env;

// describe('test auth routes', () => {
//   // let server;
//   beforeAll(() => app.listen(PORT));
//   // afterAll(() => {
//   //   server.close();
//   // });
//   beforeEach((done) => {
//     mongoose.connect(DB_HOST).then(() => done());
//   });

//   test('test login route', async () => {
//     const newUser = {
//       email: 'test@gmail.com',
//       password: 'qwe123',
//       avatarURL: 'someAvatar.jpeg',
//       token: 'omg',
//     };

//     // const user = await User.create(newUser);
//     // console.log(user);
//     // const loginUser = {
//     //   email: 'test@gmail.com',
//     //   password: 'qwe123',
//     //   token: 'omg',
//     // };

//     const loginUser = {
//       email: 'bebebe@mail.com',
//       password: 'qwe123',
//       token:
//         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDk3NTU0ZTEwMzI4NmJhYThlMjIzYyIsImlhdCI6MTY3NTUyMzM5NCwiZXhwIjoxNjc1NTc3Mzk0fQ.gK4Jtgq08pkhB4_XWMUff1LXahvHafL683YpfAD9s1g',
//     };

//     const response = await request(app)
//       .post('/api/users/login')
//       .send(loginUser);
//     console.log(response);
//     expect(response.statusCode).toBe(200);

//     // const { body } = response;
//     // expect(body.token).toByTruthy();
//   });
// });
