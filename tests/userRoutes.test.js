import request from 'supertest';
import { jest } from '@jest/globals';
import { makeApp } from '../app.js';

import mongoose from 'mongoose';

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  id: userId,
  email: 'test@example.com',
  password: 'hashedPassword',
  subscription: 'starter',
  avatarURL: 'string',
};

const registerPayload = {
  email: 'test@example.com',
  password: 'hashedPassword',
  subscription: 'starter',
  avatarURL: 'string',
};

const loginPayload = {
  id: '12345',
  email: 'test@example.com',
  password: 'hashedPassword',
  token: null,
};

const addUser = jest.fn();
const loginUser = jest.fn();
addUser.mockResolvedValue(userPayload);
loginUser.mockResolvedValue(userPayload);

const app = makeApp({
  addUser,
  loginUser,
});

describe('register and login user', () => {
  describe(' register given a username and password', () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(app).post('/api/users/signup').send(registerPayload);
      expect(response.status).toBe(201);
      //expect(addUser).toHaveBeenCalled();
    });
  });

  describe(' login given a username and password', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/api/users/login').send(loginPayload);
      console.log(response);
      expect(response.status).toBe(200);
      //expect(loginUser).toHaveBeenCalled();
    });
  });
});
