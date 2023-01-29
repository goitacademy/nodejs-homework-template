require('dotenv').config();
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const { User } = require('../../models/user');

mongoose.set('strictQuery', false);

const { HOST_TEST_URI } = process.env;

describe('register', () => {
  beforeAll(async () => {
    await mongoose.connect(HOST_TEST_URI);
    console.log('Mongo-db-test connection successful!');
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(HOST_TEST_URI);
    console.log('Mongo-db-test disconnection successful!');
  });

  it('should register new user', async () => {
    const responseRegister = await supertest(app)
      .post('/api/auth/register')
      .send({
        email: 'testUser@gmail.com',
        password: '123456',
      });
    console.log(
      'REGISTER_TEST: responseRegister.body: ',
      responseRegister.body
    );

    expect(responseRegister.statusCode).toBe(201);
    expect(responseRegister.body.data.user.email).toBe('testUser@gmail.com');
  });
});
