// use for jest with ECMAScript Modules -->  NODE_OPTIONS=--experimental-vm-modules npx jest

import * as dotenv from 'dotenv'; // to get variables from .env
import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken'; // JWT
import { loginController } from '../src/controllers/authController';
import { User } from '../src/models/userModel';
import bcrypt from 'bcrypt';

dotenv.config();
/**
ответ должен иметь статус-код 200
в ответе должен возвращаться токен
в ответе должен возвращаться объект user 
с 2 полями email и subscription, имеющие тип данных String
 */

//it.skip - to skip test

describe('User controller logIn test', () => {
  it.skip('should return data with token and user by provided valid email and password', async () => {
    const mReq = {
      body: { email: 'email@email.com', password: 'password' },
    };
    const user = { _id: '1111' };

    const mRes = {};
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    const userData = {
      token,
      user: {
        email: mReq.body.email,
        subscription: 'starter',
      },
    };

    jest.spyOn(User, 'findOne').mockImplementationOnce(async () => userData);
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => true);
    jest
      .spyOn(User, 'findOneAndUpdate')
      .mockImplementationOnce(async () => userData);

    const result = await loginController(mReq, mRes);

    expect(result.token).toEqual(token);
    // expect(result.userId).toEqual(mUserId);
    // expect(result.topic).toBeDefined();
    // expect(result.text).toBeDefined();
  });
});
