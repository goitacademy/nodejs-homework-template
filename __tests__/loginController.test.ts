import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import request from 'supertest';
import dotenv from 'dotenv';
import app from '../src/app';

dotenv.config();
mongoose.set('strictQuery', true);

describe('Login controller test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return user and token', async () => {
    const mEmail = 'test.user.1@gmail.com';
    const mPassword = '1234567890';

    const res = await request(app).post('/api/users/login').send({
      email: mEmail,
      password: mPassword,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toEqual(mEmail);
    expect(res.body.data.user.subscription).toBeDefined();
  });

  it('should return error when wrong password', async () => {
    const mEmail = 'test.user.1@gmail.com';
    const mPassword = '12345678901';

    const res = await request(app).post('/api/users/login').send({
      email: mEmail,
      password: mPassword,
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toEqual('Email or password is wrong');
  });

  it('should return error when wrong email', async () => {
    const mEmail = 'test.user@gmail.com';
    const mPassword = '1234567890';

    const res = await request(app).post('/api/users/login').send({
      email: mEmail,
      password: mPassword,
    });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toEqual('Email or password is wrong');
  });
});
