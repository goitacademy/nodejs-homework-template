const request = require('supertest');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
require('dotenv').config();

const { User, newUser } = require('../model/__mocks__/data');
const app = require('../app');

const SECRET_KEY = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
// generate valid token for user
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock('../model/users.js');
jest.mock('../model/contacts.js');

describe('tests for the route api/users', () => {
  describe.skip('tests for authorization middleware', () => {
    it('without token in the header', () => {});
    it('with invalid token in the header', () => {});
    it('with valid token in the header', () => {});
  });

  describe('tests for the route api/users/avatars', () => {
    it('should return 200 login', async (done) => {
      const res = await request(app)
        .post(`/api/users/auth/login`)
        .send({ email: User.email, password: User.password })
        .set('Accept', 'application/json');

      console.log(res);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();

      done();
    });

    it('should receive status 401 with invalid token in patch request', async (done) => {
      const buffer = await fs.readFile('./test/222.jpg');
      const res = await request(app)
        .patch('/api/users/avatars')
        .set('Authorization', `Bearer ${token}w`)
        .attach('avatar', buffer, '222.jpg');

      expect(res.status).toEqual(401);
      expect(res.body).toBeDefined();

      done();
    });
    it('should receive status 200, updated avatarUrl and correct body with valid token', async (done) => {
      const buffer = await fs.readFile('./test/222.jpg');
      const res = await request(app)
        .patch('/api/users/avatars')
        .set('Authorization', `Bearer ${token}`)
        .attach('avatar', buffer, '222.jpg');
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();

      done();
    });
  });
});
