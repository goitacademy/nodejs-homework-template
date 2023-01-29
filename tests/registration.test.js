require('dotenv').config();

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const { User } = require('../models/user');

mongoose.set('strictQuery', false);

const { TEST_HOST_URI } = process.env;

describe('registration', () => {
  beforeAll(async () => {
    mongoose.connect(TEST_HOST_URI);
    await User.deleteMany();
  });

  afterAll(() => {
    mongoose.disconnect(TEST_HOST_URI);
  });

  it('registration with invalid email or password', async () => {
    const response = await request(app).post('/api/users/register').send({
      email: 'user1_email.com',
      password: '12',
    });
    expect(response.statusCode).toBe(400);
    console.log(response.statusCode, response._body.message);
  });

  it('registration new user', async () => {
    const response = await request(app).post('/api/users/register').send({
      email: 'testUser1@gmail.com',
      password: '123456',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.user.email).toBe('testUser1@gmail.com');
    console.log(response.statusCode, response._body.message);
  });

  it('registration user with existing name', async () => {
    await request(app).post('/api/users/register').send({
      email: 'testUser2@gmail.com',
      password: '123456',
    });

    const response = await request(app).post('/api/users/register').send({
      email: 'testUser2@gmail.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(409);
    console.log(response.statusCode, response._body.message);
  });
});
