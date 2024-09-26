/* eslint-disable no-undef */
const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST, PORT = 3000 } = process.env;

const app = require('../../app');

describe('login', () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST)
      .then(() => {
        app.listen(PORT, () => {
          console.log('Database connection successful');
        });
      })
      .catch(error => console.log(error.message));
  });

  test('Login user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'Password123#',
      })
      .catch(error => console.log(error.message));

    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
    expect(typeof res.body.user === 'object').toBe(true);
    expect(typeof res.body.user.email).toBe('string');
    expect(typeof res.body.user.subscription).toBe('string');
  });

  afterAll(async () => {
    await mongoose
      .disconnect(DB_HOST)
      .then(() => console.log('Database disconnection successful'))
      .catch(error => console.log(error.message));
  });
});
