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
const addContact = jest.fn();
const listContacts = jest.fn();
addUser.mockResolvedValue(userPayload);
loginUser.mockResolvedValue(userPayload);
const usersService = {
  addUser: () => addUser,
  loginUser: () => loginUser,
};
const contactsService = {
  listContacts: () => listContacts,
  addContact: () => addContact,
};

const app = makeApp(usersService, contactsService);

describe('register and login user', () => {
  describe(' register given a username and password', () => {
    console.log('start test');
    test('should respond with a 201 status code', async () => {
      const response = await request(app).post('/api/users/signup').send(registerPayload);
      expect(response.status).toBe(201);
      //expect(addUser).toHaveBeenCalled();
    });
  });

  describe(' login given a username and password', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/api/users/login').send(loginPayload);
      expect(response.status).toBe(200);
      //expect(loginUser).toHaveBeenCalled();
    });
  });
});
