const request = require('supertest');
const db = require('../db/dbMongoose');
const app = require('../app');

describe('Login service test', () => {
  beforeAll(async () => (connect = await db));

  test('Login with valid credentials', async () => {
    const testUser = {
      email: 'test_user@gmail.com',
      password: '123123',
    };
    const expectedResponse = {
      status: 'success',
      code: 200,
      payload: {
        token: String,
        user: {
          email: testUser.email,
          subscription: 'starter' || 'pro' || 'business',
        },
      },
    };

    // http://localhost:8083/api/auth/login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test_user@gmail.com',
        password: '123123',
      })
      .set('Accept', 'application/json');

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.payload).toHaveProperty('token');
    token = res.body.payload.token;
    expect(res.body.payload.user.email).toEqual(
      expectedResponse.payload.user.email,
    );
    expect(res.body.payload.user.subscription).toEqual(
      expectedResponse.payload.user.subscription,
    );

    async () => await connect.disconnect();
  });
});
