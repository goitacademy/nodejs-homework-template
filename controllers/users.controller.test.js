import request from 'supertest';
import connect from '../database.js';
import { disconnect } from 'mongoose';
import app from '../app.js';
import 'dotenv/config';

const testEmail = process.env.JEST_TEST_EMAIL;
const testPassword = process.env.JEST_TEST_USER_PASSWORD;
const testStaticVerificationToken = process.env.JEST_TEST_STATIC_VERIFICATION_TOKEN;
const testSubscription = 'starter';
const userLoggedOutMessage = 'User successfully logged out';
const userVerifiedMessage = 'Verification successful';
let TOKEN = null;

describe('Auth routes', () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  describe('POST /api/users/signup', () => {
    it('should create a new user and return object user with email and subscription type', async () => {
      const response = await request(app).post('/api/users/signup').send({
        email: testEmail,
        password: testPassword,
      });
      expect(response.status).toBe(201);
      expect(response.body.data.user).toHaveProperty('email', testEmail);
      expect(typeof response.body.data.user.email).toBe('string');
      expect(response.body.data.user).toHaveProperty('subscription', testSubscription);
      expect(typeof response.body.data.user.subscription).toBe('string');
    });
  });

  describe(`GET /users/verify/:testStaticVerificationToken`, () => {
    it(`should return 200 and message about verification successful`, async () => {
      const response = await request(app).get(`/api/users/verify/${testStaticVerificationToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', userVerifiedMessage);
      expect(typeof response.body.message).toBe('string');
    });
  });

  describe('POST /users/login', () => {
    it('should return 200, user token and object user with email and subscription', async () => {
      const response = await request(app).post('/api/users/login').send({
        email: testEmail,
        password: testPassword,
      });
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('token');
      expect(typeof response.body.data.token).toBe('string');
      expect(response.body.data.user).toHaveProperty('email', testEmail);
      expect(typeof response.body.data.user.email).toBe('string');
      expect(response.body.data.user).toHaveProperty('subscription', testSubscription);
      expect(typeof response.body.data.user.subscription).toBe('string');
    });
  });

  describe('FIRST: POST /users/login THEN: GET /users/logout', () => {
    describe('POST /users/login', () => {
      it('should return 200, user token and object user with email and subscription', async () => {
        const response = await request(app).post('/api/users/login').send({
          email: testEmail,
          password: testPassword,
        });
        TOKEN = response.body.data.token;
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('token');
        expect(typeof response.body.data.token).toBe('string');
        expect(response.body.data.user).toHaveProperty('email', testEmail);
        expect(typeof response.body.data.user.email).toBe('string');
        expect(response.body.data.user).toHaveProperty('subscription', testSubscription);
        expect(typeof response.body.data.user.subscription).toBe('string');
      });
    });

    describe('GET /users/logout', () => {
      it('should return 200 and message about user logged out', async () => {
        const response = await request(app)
          .get('/api/users/logout')
          .set('Authorization', `Bearer ${TOKEN}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', userLoggedOutMessage);
        expect(typeof response.body.message).toBe('string');
      });
    });
  });

  describe('FIRST: POST /users/login THEN: DELETE /users/delete', () => {
    describe('POST /users/login', () => {
      it('should return 200, user token and object user with email and subscription', async () => {
        const response = await request(app).post('/api/users/login').send({
          email: testEmail,
          password: testPassword,
        });
        TOKEN = response.body.data.token;
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('token');
        expect(typeof response.body.data.token).toBe('string');
        expect(response.body.data.user).toHaveProperty('email', testEmail);
        expect(typeof response.body.data.user.email).toBe('string');
        expect(response.body.data.user).toHaveProperty('subscription', testSubscription);
        expect(typeof response.body.data.user.subscription).toBe('string');
      });
    });

    describe('DELETE /users/delete', () => {
      it('should return 200 and object deleteUser with email', async () => {
        const response = await request(app)
          .delete('/api/users/delete')
          .send({
            email: testEmail,
            password: testPassword,
          })
          .set('Authorization', `Bearer ${TOKEN}`);
        expect(response.status).toBe(200);
        expect(response.body.data.deletedUser).toHaveProperty('email', testEmail);
        expect(typeof response.body.data.deletedUser.email).toBe('string');
      });
    });
  });
});
