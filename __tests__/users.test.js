const User = require('../models/users');
const request = require('supertest');
const {
  test,
  expect,
  beforeAll,
  afterAll,
  describe,
} = require('@jest/globals');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../app');

describe('Authorization tests', () => {
  let userToken = null;
  beforeAll(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('1234user', salt);
    await User.create({
      email: 'test.email@gmail.com',
      password: hashedPassword,
    });
    const testUser = await User.findOne({ email: 'test.email@gmail.com' });
    userToken = await jwt.sign({ userId: testUser._id }, process.env.SECRET, {
      expiresIn: '10h',
    });
  });
  afterAll(async () => {
    await User.deleteOne({ email: 'test.email@gmail.com' });
  });

  test('we expect succesfully login', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test.email@gmail.com', password: '1234user' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty({
      email: 'test.email@gmail.com',
      password: '1234user',
    });
    expect(res.body.user).toHaveProperty('subscription', 'starter');
  });

  test('we expect get 401 for invalid credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test.email@gmail.com', password: 'invalid_password' });
    expect(res.status).toBe(401);
  });

  test('we should use testToken to access protected routes', async () => {
    const res = await request(app)
      .get('/protected-route')
      .set(`Authorization`, `Bearer ${userToken}`);
    expect(res.status).toBe(200);
  });
});
