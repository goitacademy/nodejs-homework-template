const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

describe('Authentication Controller Tests', () => {
  it('should return status code 200 and a token when user logs in', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return user object with email and subscription fields as strings', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email');
    expect(response.body.user).toHaveProperty('subscription');
    expect(typeof response.body.user.email).toBe('string');
    expect(typeof response.body.user.subscription).toBe('string');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});