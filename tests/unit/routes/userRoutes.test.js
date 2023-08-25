import request from 'supertest';
import { app } from '../../../app';
import { jest } from '@jest/globals';
import { signupMiddleware } from '../../../routes/api/users.middleware';

const addUser = jest.fn().mockResolvedValue({
  email: 'test@example.com',
  password: 'hashedPassword',
  avatarURL: 'avatarURLValue',
  subscription: 'starter',
});

// describe('add user', () => {
//   describe('when passed a username and password', () => {
//     it('should add a new user', async () => {
//       const result = await addUser({
//         email: 'test@example.com',
//         password: 'hashedPassword',
//         avatarURL: 'avatarURLValue',
//         subscription: 'starter',
//       });

//       expect(result).toEqual(
//         expect.objectContaining({
//           email: 'test@example.com',
//           password: 'hashedPassword',
//           avatarURL: expect.any(String),
//         })
//       );
//     });
//   });
// });

jest.mock('../../../models/users.js', () => ({
  addUser: jest.fn().mockResolvedValue({
    email: 'test@example.com',
    password: 'hashedPassword',
    avatarURL: 'avatarURLValue',
    subscription: 'starter',
  }),
}));

describe('register user', () => {
  describe('given a username and password', () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(app)
        .post('/api/users/signup', signupMiddleware(addUser))
        .send({
          email: 'test@example.com',
          password: 'hashedPassword',
          subscription: 'starter',
          avatarURL: `string`,
        });
      expect(response.status).toBe(201);
    });
  });
});
