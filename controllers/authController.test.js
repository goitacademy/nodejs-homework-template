import mongoose from 'mongoose';
import 'dotenv/config';
import request from 'supertest';

import app from '../app.js';
import User from '../models/user.js';

// ##########################################

const { DB_HOST_TEST, PORT } = process.env;

// ##########################################

/*
1. Response must return a status code of 200
2. Response must return a token
3. Response must return a user object with 2 fields - 'email' and 'subscription', both with the data type of String
*/

describe('Test the login controller', () => {
  let server = null;

  const loginData = { email: 'test@mail.ua', password: '1234567' };

  // ****************************************

  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);

    await User.create(loginData);
  });

  afterAll(async () => {
    await User.deleteMany({});

    await mongoose.connection.close();
    server.close();
  });

  // ****************************************

  test('Response must return a status code of 200', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send(loginData);

    console.log(response);

    expect(statusCode).toBe(200);
  });

  // test('Response must return a token', async () => {
  //   const { body } = await request(app)
  //     .post('/api/users/login')
  //     .send(loginData);

  //   expect(body.token).toBeTruthy();
  // expect(body).toHaveProperty("token");

  // });

  // ****************************************
});
