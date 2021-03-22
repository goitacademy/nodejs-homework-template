const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User, newUser } = require('../model/__mocks__/data');
const app = require('../app');

const SECRET_KEY = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, SECRET_KEY);
User.token = token;

jest.mock('../model/contacts.js');
jest.mock('../model/users.js');

describe('Testing the route api/users', () => {
  it('should return 201 registration', async done => {
    const res = await request(app)
      .post(`/api/users/registration`)
      .send(newUser)
      .set('Accept', 'application/json');

    expect(res.status).toEqual(201);
    expect(res.body).toBeDefined();

    done();
  });
});
