import mongoose from 'mongoose';
import 'dotenv/config';
import request from 'supertest';

import app from '../app.js';
import User from '../models/user.js';

// ##########################################

const { DB_HOST_TEST, PORT } = process.env;

// ***************************************************
/*
1. Response must return a status code of 200
2. Response must return a token
3. Response must return a user object with 2 fields - 'email' and 'subscription', both of which must be of type String
*/
// ***************************************************

describe('Test the login controller', () => {
  let server = null;

  const credentials = { email: 'test@mail.ua', password: '1234567' };

  // ****************************************

  beforeAll(async () => {
    mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
    // await User.create(credentials);
  });

  afterAll(async () => {
    // await User.deleteMany({});
    mongoose.connection.close();
    server.close();
  });

  // ****************************************

  test('Response must return a status code of 200', async () => {
    const { statusCode } = await request(app)
      .post('/api/users/login')
      .send(credentials);

    expect(statusCode).toBe(200);
  }, 15000);

  // ****************************************

  test('Response must return a token', async () => {
    const { body } = await request(app)
      .post('/api/users/login')
      .send(credentials);

    expect(body).toHaveProperty('token');
    expect(body.token).toBeTruthy();
  }, 15000);

  // ****************************************

  test('Response must return a user object with 2 fields - "email" and "subscription", both of which must be of type String', async () => {
    const {
      body: { user },
    } = await request(app).post('/api/users/login').send(credentials);

    const { email, subscription } = user;

    expect(user).toHaveProperty('email', credentials.email);
    expect(typeof email).toBe('string');

    expect(user).toHaveProperty('subscription');
    expect(typeof subscription).toBe('string');
  }, 15000);

  // ****************************************
});
