import mongoose from 'mongoose';
import request from 'supertest';
import 'dotenv/config';

import app from '../../app.js';
import User from '../../models/User.js';

// ============================================================

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe('test /api/users/register', () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('test register with correct data', async () => {
    const registerData = {
      email: 'testuser@mail.com',
      password: '12345678',
    };

    const { statusCode, body } = await request(app)
      .post('/api/users/register')
      .send(registerData);
    expect(statusCode).toBe(201);
    expect(body.user.email).toBe(registerData.email);
    expect(body.user.subscription).toBe('starter');

    const user = await User.findOne({ email: registerData.email });
    expect(user).toBeTruthy();
  });

  test('test not register new user with already added email', async () => {
    const registerData = {
      email: 'testuser@mail.com',
      password: '12345678',
    };

    await request(app).post('/api/users/register').send(registerData);

    const { statusCode } = await request(app)
      .post('/api/users/register')
      .send(registerData);
    expect(statusCode).toBe(409);
  });
});

describe('test /api/users/login', () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('test login with correct data', async () => {
    const registerData = {
      email: 'testuser@mail.com',
      password: '12345678',
    };

    await request(app).post('/api/users/register').send(registerData);

    const {
      statusCode,
      body: { token, user },
    } = await request(app).post('/api/users/login').send(registerData);
    expect(statusCode).toBe(200);
    expect(token).toBeDefined();
    expect(Object.keys(user)).toContain('email' && 'subscription');
    expect(typeof user.email).toBe('string');
    expect(typeof user.subscription).toBe('string');
  });
});
