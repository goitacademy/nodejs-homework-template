require('dotenv').config();
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const { User } = require('../../models/user');

mongoose.set('strictQuery', false);

const { HOST_TEST_URI } = process.env;

describe('login', () => {
  beforeAll(async () => {
    await mongoose.connect(HOST_TEST_URI);
    console.log('Mongo-db-test connection successful!');
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(HOST_TEST_URI);
    console.log('Mongo-db-test disconnection successful!');
  });

  it('should register new user, verify and login', async () => {
    await supertest(app) // const responseRegister =
      .post('/api/auth/register')
      .send({
        email: 'testUser@gmail.com',
        password: '123456',
      });
    // add verify // ask mentor
    const storedUser = await User.findOne({ email: 'testUser@gmail.com' });
    console.log('storedUser: ', storedUser);
    await supertest(app).post(
      `/api/auth/verify/${storedUser.verificationToken}`
    );

    const responseLogin = await supertest(app).post('/api/auth/login').send({
      email: 'testUser@gmail.com',
      password: '123456',
    });
    console.log('LOGIN_TEST: responseLogin.body: ', responseLogin.body);

    expect(responseLogin.statusCode).toBe(200);
    expect(responseLogin.body.data.user.email).toBe('testUser@gmail.com');
  });
});

// describe('login', () => {
//   beforeAll(async () => {
//     await mongoose.connect(HOST_TEST_URI);
//     console.log('Mongo-db-test connection successful!');
//     await User.deleteMany();
//   });

//   afterAll(async () => {
//     await mongoose.disconnect(HOST_TEST_URI);
//     console.log('Mongo-db-test disconnection successful!');
//   });

//   it('should register new user', async () => {
//     const response = await supertest(app).post('/api/auth/register').send({
//       email: 'testUser@gmail.com',
//       password: '123456',
//     });
//     console.log('after register response.body: ', response.body);

//     expect(response.statusCode).toBe(201);
//     expect(response.body.data.user.email).toBe('testUser@gmail.com');
//   });

//   it('should login registered user', async () => {
//     const response = await supertest(app).post('/api/auth/login').send({
//       email: 'testUser@gmail.com',
//       password: '123456',
//     });
//     console.log('after login response.body: ', response.body);

//     expect(response.statusCode).toBe(200);
//     expect(response.body.data.user.email).toBe('testUser@gmail.com');
//   });
// });

// Question to mentor: How can I used together register and login test?
