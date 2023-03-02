const request = require('supertest');
const app = require('../app');
const {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
} = require('@jest/globals');

const mongoose = require('mongoose');
require('dotenv').config();
const { DB_HOST, PORT = 3001 } = process.env;
mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

describe('test logIn response', () => {
  beforeAll((done) => {
    done();
  });
  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
  test('should have success result with status 200', async () => {
    expect.assertions(1);
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'duin@egetlacus.ca', password: 'Mypassword1' });
    expect(response.status).toBe(200);
  });
});
