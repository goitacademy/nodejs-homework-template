const mongoose = require('mongoose').set(
  'strictQuery',
  false
);
require('colors');
const request = require('supertest');

const app = require('../app');
const { User } = require('../models/user');

const { DB_TEST_HOST, PORT } = process.env;

describe('test auth routes', () => {
  let server;

  beforeAll(() => (server = app.listen(PORT)));

  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test('test login route', async () => {
    const newUser = {
      email: 'newKyzym@gmail.com',
      password: 'qwe123',
      verify: true,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ViOTNlMDU4MDI0ZTQ3Y2JjMDk3YzIiLCJpYXQiOjE2NzYzODMyNDIsImV4cCI6MTY3NjQzNzI0Mn0.fOzCodMe7Z3Ov466NnELDfTE0cnsrZHHvk-cpOn84Zc',
      avatarURL: 'someUrl.jpeg',
      verificationCode: 'some123123123123CODe',
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: 'newKyzym@gmail.com',
      password: 'qwe123',
    };

    try {
      const response = await request(app)
        .post('/api/users/login')
        .send(loginUser);
      console.log(response);
      expect(response.statusCode).toBe(200);
      const { body } = response;

      expect(body.token).toByTruthy();

      const { token } = await User.findById(user._id);
      expect(body.token).toBe(token);
    } catch (error) {
      console.log(`${error}`.bgRed);
    }
  });
});
