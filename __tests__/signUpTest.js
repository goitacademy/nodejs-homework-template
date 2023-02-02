import * as dotenv from 'dotenv';
import request from 'supertest';
import app from '../app';
import { mongoose } from 'mongoose';
import { User } from '../src/models/userModel';

dotenv.config();
mongoose.set('strictQuery', true);

const { MONGO_TEST_URL } = process.env;

describe('signUp', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_TEST_URL);
    console.log('Test database connection successful');

    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.disconnect(MONGO_TEST_URL);
  });

  it.skip('should signUp new user with email and password', async () => {
    const data = {
      email: `signup@email.com`,
      password: 'password',
    };

    const response = await request(app)
      .post('/api/users/signup')
      .send(data)
      .set('Accept', 'application/json');

    const { status } = response;
    const { email, subscription } = response.body.data;

    expect(status).toBe(201);
    expect(email).toEqual(data.email);
    expect(
      (subscription === 'starter') |
        (subscription === 'pro') |
        (subscription === 'business')
    ).toBe(1);
  });

  it.skip('should end with error "Conflict" in case of signup with same email', async () => {
    const data = {
      email: `signup2@email.com`,
      password: 'password',
    };

    await request(app)
      .post('/api/users/signup')
      .send(data)
      .set('Accept', 'application/json');

    const response = await request(app)
      .post('/api/users/signup')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.status).toBe(409);
  });
});
