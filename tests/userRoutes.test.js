import request from 'supertest';
import { jest } from '@jest/globals';
import { app } from '../app.js';
import { usersService } from '../models/users.js';

import { MongoMemoryServer } from 'mongodb-memory-server';

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

Object.defineProperty(usersService, 'addUser', {
  value: jest.fn(),
  configurable: true,
  writable: true,
});

jest.mock('../models/users.js', () => {
  const mockFunction = { addUser: jest.fn() };
  console.log(mockFunction);
  return jest.fn(() => mockFunction);
});

//const mockAddUser = jest.fn(() => Promise.resolve(userPayload));

describe('register and login user', () => {
  // beforeAll(async () => {
  //   const mongoServer = await MongoMemoryServer.create();

  //   await mongoose.connect(mongoServer.getUri());
  // });

  // afterAll(async () => {
  //   await mongoose.disconnect();
  //   await mongoose.connection.close();
  // });

  describe(' register given a username and password', () => {
    test('should respond with a 201 status code', async () => {
      usersService.addUser.mockResolvedValueOnce(userPayload);
      const addUserMock = jest.spyOn(usersService, 'addUser').mockReturnValueOnce(userPayload);
      const response = await request(app).post('/api/users/signup').send(registerPayload);
      expect(response.status).toBe(201);
      //expect(addUserMock).toHaveBeenCalled();
    });
  });

  describe(' login given a username and password', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/api/users/login').send({
        id: '12345',
        email: 'test@example.com',
        password: 'hashedPassword',
        token: null,
      });
      expect(response.status).toBe(200);
    });
  });
});
