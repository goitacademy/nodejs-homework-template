const request = require('supertest');
const fs = require('fs/promises');
require('dotenv').config();
const dbContacts = require('../config/dbContacts');
const app = require('../app');
const Users = require('../model/schemaUser');
const { newUserForRouteUser } = require('./data/data');
const { HttpCode } = require('../config/constants');

jest.mock('cloudinary');

describe('Test router users', () => {
  let token;

  beforeAll(async () => {
    await dbContacts;
    await Users.deleteOne({ email: newUserForRouteUser.email });
  });

  afterAll(async () => {
    const mongo = await dbContacts;
    await Users.deleteOne({ email: newUserForRouteUser.email });
    await mongo.disconnect();
  });

  it('Register user', async () => {
    const { email, password } = newUserForRouteUser;
    const response = await request(app)
      .post('/api/users/signup')
      .send({ email, password })
      .set('Accept', 'application/json');

    expect(response.status).toEqual(HttpCode.CREATED);
    expect(response.body).toBeDefined();
  });

  it('User exist return status 409 ', async () => {
    const { email, password } = newUserForRouteUser;
    const response = await request(app)
      .post('/api/users/signup')
      .send({ email, password })
      .set('Accept', 'application/json');

    expect(response.status).toEqual(HttpCode.CONFLICT);
    expect(response.body).toBeDefined();
  });

  it('Login user', async () => {
    const { email, password } = newUserForRouteUser;
    const response = await request(app)
      .post('/api/users/login')
      .send({ email, password })
      .set('Accept', 'application/json');

    expect(response.status).toEqual(HttpCode.OK);
    expect(response.body).toBeDefined();

    token = response.body.data.token;
  });

  it('Upload avatar for user', async () => {
    const buffer = await fs.readFile('./tests/data/default.jpg');

    const response = await request(app)
      .patch('/api/users/avatars')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatars', buffer, 'default.png');

    expect(response.status).toEqual(HttpCode.OK);
    expect(response.body).toBeDefined();
  });
});
