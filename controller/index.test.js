const mongoose = require('mongoose');
const request = require('supertest');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = require('../app');
const Users = require('../models/users');
const { DB_HOST, PORT } = process.env;

describe('test auth route', () => {
  let server;

  beforeAll(() => (server = app.listen(PORT)));

  afterAll(() => server.close());

  beforeEach(done => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  test('test signup', async () => {
    const password = '123456q';
    const email = 'test123@gmail.com';

    const hash = await bcrypt.hash(password, 10);

    await Users.create({ email, password: hash });

    const response = await request(app)
      .post('/users/login')
      .send({ email, password });

    const { token, user } = response.body;

    expect(response.statusCode).toBe(200);

    expect(token).not.toBe('');

    expect(Object.keys(user)).toEqual(['email', 'subscription', 'avatarURL']);

    expect(typeof user.email == 'string').toEqual(true);
    expect(typeof user.subscription == 'string').toEqual(true);
  });
});
