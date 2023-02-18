const mongoose = require('mongoose').set(
  'strictQuery',
  false
);
require('colors');
const request = require('supertest');

const app = require('../app');
const { User } = require('../models/user');

const { DB_TEST_HOST, PORT } = process.env;

describe('test login rout', () => {
  let server;

  beforeAll(() => (server = app.listen(PORT)));

  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.close(() => done());
  });

  test('test login route', async () => {
    const loginUser = {
      email: 'kyzym1@gmail.com',
      password: 'qwe123',
    };

    const user = {
      email: 'kyzym1@gmail.com',
      password: 'qwe123',
      _id: '63f09591f0c426364a2673b1',
    };

    try {
      const response = await request(app)
        .post('/api/users/login')
        .send(loginUser);

      expect(response.statusCode).toBe(200);
      const { body } = response;

      expect(body.token).toBeDefined();

      const { token } = await User.findById(user._id);

      expect(body.token).toBe(token);
    } catch (error) {
      console.log(
        `some error in catch ${error.message}`.bgRed
      );
    }
  });
});
