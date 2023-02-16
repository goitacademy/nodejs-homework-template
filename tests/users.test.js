const request = require('supertest');
const { expect } = require('@jest/globals');

const user = {
  email: `foo${Math.random(1000)}@email.com`,
  password: 'Qwerty123!',
};

describe('signup', () => {
  test(`Signup email:"${user.email}", password:"${user.password}"`, async () => {
    const res = await request('http://localhost:3000')
      .post('/api/users/signup')
      .send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.error).toBe(undefined);

    const expectedBody = {
      password: expect.stringMatching('^[A-Za-z./$]'),
      email: user.email,
    };
    expect(res.body.user).toMatchObject(expectedBody);
  });
});

describe('login', () => {
  test(`Login email:"${user.email}", password:"${user.password}"`, async () => {
    const res = await request('http://localhost:3000')
      .post('/api/users/login')
      .send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe(undefined);

    const expectedBody = {
      token: expect.stringMatching('^[a-zA-Z.]'),
      user: {
        email: user.email,
        subscription: 'starter' || 'pro' || 'business',
      },
    };
    expect(res.body).toMatchObject(expectedBody);
  });
});
