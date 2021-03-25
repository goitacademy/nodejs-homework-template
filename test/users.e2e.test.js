const request = require('supertest');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

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
  it('should return 409 registration - email alredy use', async done => {
    const res = await request(app)
      .post(`/api/users/registration`)
      .send(newUser)
      .set('Accept', 'application/json');

    expect(res.status).toEqual(409);
    expect(res.body).toBeDefined();

    done();
  });
  it('should return 200 login', async done => {
    const res = await request(app)
      .post(`/api/users/login`)
      .send(newUser)
      .set('Accept', 'application/json');

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();

    done();
  });
  it('should return 401 login', async done => {
    const res = await request(app)
      .post(`/api/users/login`)
      .send({ email: 'fake@test.com', password: '123456789' })
      .set('Accept', 'application/json');

    expect(res.status).toEqual(401);
    expect(res.body).toBeDefined();

    done();
  });
  it('should return 200 upload avatar', async done => {
    const buffer = await fs.readFile('./test/def-avatar.jpg');
    const res = await request(app)
      .patch(`/api/users/avatars`)
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', buffer, 'test-avatar.jpg');

    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();

    done();
  });
});
