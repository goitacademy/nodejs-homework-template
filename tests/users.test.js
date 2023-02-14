const app = require('../app');
const request = require('supertest');
const { expect } = require('@jest/globals');

const user = {
  email: `foo${Math.random(1000)}@email.com`,
  password: 'Qwerty123!',
};

const authUser = {
  _id: 123456,
};

const commonHeaders = {
  Authorization: 'token',
  'Content-Type': 'application/json',
};

expect.extend({
  toBeType(received, argument) {
    const initialType = typeof received;
    const type =
      initialType === 'object'
        ? Array.isArray(received)
          ? 'array'
          : initialType
        : initialType;
    return type === argument
      ? {
          message: () => `expected ${received} to be type ${argument}`,
          pass: true,
        }
      : {
          message: () => `expected ${received} to be type ${argument}`,
          pass: false,
        };
  },
});

describe('signup', () => {
  beforeAll(() => {
    console.log(
      `Start test signup user = {email: ${user.email}, password: ${user.password}}`
    );
  });
  afterAll(() => {
    console.log('End test signin user');
  });
  test(`Signup email:"${user.email}", password:"${user.password}"`, async () => {
    const res = await request('http://localhost:3000')
      .post('/api/users/signup')
      .send(user);
    console.log(res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.error).toBe(undefined);
    expect(res.body.user).toHaveProperty('email');
    expect(res.body.user).toHaveProperty('password');
    expect(res.body.user.email).toBeType('string');
    expect(res.body.user.password).toBeType('string');
  });
});

describe('login', () => {
  beforeAll(() => {
    console.log(
      `Start test login user = {email: ${user.email}, password: ${user.password}}`
    );
  });
  afterAll(() => {
    console.log('End test script');
  });
  test(`Login email:"${user.email}", password:"${user.password}"`, async () => {
    const res = await request('http://localhost:3000')
      .post('/api/users/login')
      .send(user);
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.error).toBe(undefined);
    expect(res.body).toHaveProperty('token');
    expect(res.body.token).toBeType('string');
  });
});
