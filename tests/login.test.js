require('dotenv').config();

const { getType } = require('jest-get-type');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

mongoose.set('strictQuery', false);

const { HOST_URI } = process.env;

describe('login', () => {
  beforeAll(() => {
    mongoose.connect(HOST_URI);
  });

  afterAll(() => {
    mongoose.disconnect(HOST_URI);
  });

  it('login with invalid email or password', async () => {
    const response = await request(app).get('/api/users/login').send({
      email: 'user1_email.com',
      password: '12',
    });
    expect(response.statusCode).toBe(400);
    console.log(response.statusCode, response._body.message);
  });

  it('login user', async () => {
    const response = await request(app).get('/api/users/login').send({
      email: 'user1@email.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(200);
    expect(getType(response.body.token)).toBe('string');
    expect(response.body.user.email).toBe('user1@email.com');
    expect(response.body.user.subscription).toBe('starter' || 'pro' || 'business');

    console.log(response.statusCode, response._body.message);
  });

  it('login with wrong password', async () => {
    const response = await request(app).get('/api/users/login').send({
      email: 'user1@email.com',
      password: '123456_',
    });
    expect(response.statusCode).toBe(401);
    console.log(response.statusCode, response._body.message);
  });

  it('login with wrong email', async () => {
    const response = await request(app).get('/api/users/login').send({
      email: 'user11@email.com',
      password: '123456',
    });
    expect(response.statusCode).toBe(401);
    console.log(response.statusCode, response._body.message);
  });
});
