const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();

const { DB_TEST_HOST, PORT = 3000 } = process.env;

const app = require('../../app');

describe('test signIn', () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach(done => mongoose.connect(DB_TEST_HOST).then(() => done()));
  afterEach(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  test('test signin route', async () => {
    const authData = {
      email: 'example4@example.com',
      password: '123456',
    };
    const response = await request(app).post('/api/users/login').send(authData);

    // ответ должен иметь статус-код 200
    expect(response.status).toBe(200);

    // в ответе должен возвращаться токен
    expect(response.body.token).toBeTruthy();
    expect(typeof response.body.token).toBe('string');

    // в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String
    expect(typeof response.body.user).toBeTruthy();
    expect(typeof response.body.user).toBe('object');
    expect(typeof response.body.user.email).toBe('string');
    expect(typeof response.body.user.subscription).toBe('string');
  });
});
