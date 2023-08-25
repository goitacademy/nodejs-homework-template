import request from 'supertest';
import { app } from '../../../app';
import { jest } from '@jest/globals';
import { signupMiddleware, loginMiddleware } from '../../../routes/api/users.middleware';

const mockAddUser = jest.fn().mockResolvedValue({
  email: 'test@example.com',
  password: 'hashedPassword',
  subscription: 'starter',
  avatarURL: 'string',
});

describe('register user', () => {
  describe('given a username and password', () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(app)
        .post('/api/users/signup', signupMiddleware(mockAddUser))
        .send({
          email: 'test@example.com',
          password: 'hashedPassword',
          subscription: 'starter',
        });
      console.log(response.user);
      expect(response.status).toBe(201);
    });
  });
});

const loginUser = jest.fn().mockResolvedValue({
  id: '12345',
  email: 'test@example.com',
  password: 'hashedPassword',
  token: null,
});

describe('login user', () => {
  describe('given a username and password', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app)
        .post('/api/users/login', loginMiddleware(loginUser))
        .send({
          id: '12345',
          email: 'test@example.com',
          password: 'hashedPassword',
          token: null,
        });
      expect(response.status).toBe(200);
    });
  });
});
