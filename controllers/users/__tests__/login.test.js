/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../../server');

describe('login', () => {
  it('should return token and user', async () => {
    const testData = {
      email: 'testuser@test.co',
      password: 'TestPassword12345',
    };

    const res = await request(app).post('/api/users/login').send(testData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.any(String),
        }),
      })
    );
  });

  it('should return unauth error (wrong password)', async () => {
    const testData = {
      email: 'testuser@test.co',
      password: 'TestPass45',
    };

    const res = await request(app).post('/api/users/login').send(testData);

    expect(res.statusCode).toBe(401);
  });

  it('should return unauth error (wrong email)', async () => {
    const testData = {
      email: 'testuse@t.co',
      password: 'TestPassword12345',
    };

    const res = await request(app).post('/api/users/login').send(testData);

    expect(res.statusCode).toBe(401);
  });
});
