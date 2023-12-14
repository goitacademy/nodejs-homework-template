import mongoose from 'mongoose';
import app from '../../app.js';
import request from 'supertest';
// import { User } from '../../models/User.js';

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe('test /users', () => {
  let server;

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_TEST_HOST);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

//   afterEach(async () => {
//     await User.deleteMany();
//   });

  test('test /register with correctData', async () => {
    const userData = { email: 'test@example.com', password: 'password123' };
    const response = await request(app).post('/users/register').send(userData);

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toEqual({
      email: userData.email,
      subscription: expect.any(String),
      avatarURL: expect.any(String),
    });
  });

  test('test /login with correctData', async () => {
    const userData = { email: 'test@example.com', password: 'password123' };
    const response = await request(app).post('/users/login').send(userData);

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual({
      email: userData.email,
      subscription: expect.any(String),
    });
    expect(response.body.token).toBeTruthy();
  });

  test('test /login with incorrectData', async () => {
    const userData = { email: 'nonexistent@example.com', password: 'wrongpassword' };
    const response = await request(app).post('/users/login').send(userData);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Email or password is wrong');
  });
});
