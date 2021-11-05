const request = require('supertest');
const fs = require('fs/promises');

require('dotenv').config();

const db = require('../config/db');
const app = require('../app');

const User = require('../model/user');

const { HttpCode } = require('../config/constants');
const { newUserForRouteUser } = require('./data/data');

jest.mock('../services/file-upload');

describe('Test route users', () => {
  let token;

  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUserForRouteUser.email });
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUserForRouteUser.email });
    await mongo.disconnect();
  });

  it('Signup user', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send(newUserForRouteUser)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(HttpCode.CREATED);
    expect(response.body).toBeDefined();
  });

  it('Return status 409 if user exists', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send(newUserForRouteUser)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(HttpCode.CONFLICT);
    expect(response.body).toBeDefined();
  });

  it('Login user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send(newUserForRouteUser)
      .set('Accept', 'application/json');

    expect(response.status).toEqual(HttpCode.OK);
    expect(response.body).toBeDefined();
    token = response.body.data.token;
  });

  it('Upload avatar for user', async () => {
    const buffer = await fs.readFile('./test/data/avatar-crocodile.jpg');
    const response = await request(app)
      .patch(`/api/users/avatar`)
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', buffer, 'avatar-test.jpg');

    expect(response.status).toEqual(HttpCode.OK);
    expect(response.body).toBeDefined();
  });

  it('Get current user', async () => {
    const response = await request(app)
      .get('/api/users/current')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(HttpCode.OK);
    expect(response.body).toBeDefined();
  });

  it('Logout user', async () => {
    const response = await request(app)
      .post('/api/users/logout')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(HttpCode.NO_CONTENT);
    expect(response.body).toBeDefined();
  });
});
