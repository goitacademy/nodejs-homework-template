// const request = require('supertest');
// const assert = require('assert');
// const express = require('express');
import * as dotenv from 'dotenv'; // to get variables from .env

import request from 'supertest';
import app from '../app';
import { mongoose } from 'mongoose';
dotenv.config();
mongoose.set('strictQuery', true);

const PORT = process.env.PORT || 3000;
const { MONGO_TEST_URL } = process.env;

describe('signUp', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_TEST_URL);

    console.log('Test database connection successful');
  });

  afterAll(async () => {
    await mongoose.disconnect(MONGO_TEST_URL);
  });

  it('should signUp new user', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'mail@mail.com',
        password: 'password',
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.data.email).toEqual('mail@mail.com');
    // expect(response.body.data.subscription).toBe('string'); // to set type String
  });
});

// app.get('/user', function (req, res) {
//   res.status(200).json({ name: 'john' });
// });
