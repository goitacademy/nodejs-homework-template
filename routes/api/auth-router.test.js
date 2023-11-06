import mongoose from 'mongoose';
import request from 'supertest';
import 'dotenv/config';

import app from '../../app.js';
import User from '../../models/user.js';

const { DB_HOST_TEST } = process.env;

describe('test-login route', () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(3000);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test('test login with correct data', async () => {
    const loginData = {
      email: 'example@example.com',
      password: 'examplepassword',
    };
    const { statusCode, body } = await request(app)
      .post('/api/users/login')
      .send(loginData);

    expect(statusCode).toBe(200);

    const user = await User.findOne({ email: loginData.email });
    expect(body.token).toBe(user.token);

    expect({
      user: { email: loginData.email, subscription: body.user.subscription },
    }).toEqual({
      user: { email: user.email, subscription: user.subscription },
    });
  });
});
