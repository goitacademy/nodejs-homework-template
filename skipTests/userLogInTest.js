//folder --> __tests__
import * as dotenv from 'dotenv';
import request from 'supertest';
import app from '../app';
import { mongoose } from 'mongoose';
import { User } from '../src/models/userModel';

dotenv.config();
mongoose.set('strictQuery', true);

const { MONGO_TEST_URL } = process.env;

describe('logIn', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_TEST_URL);
    console.log('Test database connection successful');

    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(MONGO_TEST_URL);
  });

  it.skip('should logIn user with email and password', async () => {
    const data = {
      email: `login@email.com`,
      password: 'password',
    };

    await request(app)
      .post('/api/users/signup')
      .send(data)
      .set('Accept', 'application/json');

    //TODO: add verify password

    const response = await request(app)
      .post('/api/users/login')
      .send(data)
      .set('Accept', 'application/json');

    const { status } = response;
    const { token, user } = response.body.data;

    expect(status).toBe(200);
    expect(token).toBeDefined();
    expect(user).toBeDefined();
    expect(user.email).toEqual(data.email);
    expect(
      (user.subscription === 'starter') |
        (user.subscription === 'pro') |
        (user.subscription === 'business')
    ).toBe(1);
  });

  it.skip('should end with error in case of invalid credentials', async () => {
    const data = {
      email: `login2@email.com`,
      password: 'password',
    };

    const invalidData = {
      email: `login2@email.com`,
      password: 'passwordInvalid',
    };

    await request(app)
      .post('/api/users/signup')
      .send(data)
      .set('Accept', 'application/json');

    const response = await request(app)
      .post('/api/users/login')
      .send(invalidData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
  });
});
