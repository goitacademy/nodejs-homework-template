import * as dotenv from 'dotenv';
import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../src/middleware/authMiddleware';
import createError from 'http-errors';
dotenv.config();

describe('Auth middleware test', () => {
  it.skip('should call next() and add user to req. object in case token is valid', () => {
    const user = { _id: '1111' };
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    const mReq = {
      headers: { authorization: `Bearer ${token}` },
    };
    const mRes = {};
    const mockNext = jest.fn();

    authMiddleware(mReq, mRes, mockNext);

    expect(mReq.user.userId).toEqual(user._id);
    expect(mockNext).toHaveBeenCalled();
  });

  it.skip('should call next() with error in case authorization header missing', () => {
    const mReq = { headers: {} };
    const mRes = {};
    const mockNext = jest.fn();

    authMiddleware(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      new createError(401, 'Authorization required')
    );
  });

  it.skip('should call next() with error in case token is expired', () => {
    const user = { _id: '1111' };
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1',
    });

    const mReq = {
      headers: { authorization: `Bearer ${token}` },
    };
    const mRes = {};
    const mockNext = jest.fn();

    authMiddleware(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      new createError(401, `Token error: jwt expired`)
    );
  });
});

// use for jest with ECMAScript Modules -->  NODE_OPTIONS=--experimental-vm-modules npx jest
