import jwt from 'jsonwebtoken'; // JWT
import { setErrorResponse } from '../helpers/setResponse.js';
import { User } from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('Authorization required');
    }

    const [tokenType, token] = authorization.split(' ');
    if (!authorization || !token) {
      throw new Error('Authorization token required');
    }

    const userData = jwt.decode(token, process.env.JWT_SECRET);

    if (!userData) {
      throw new Error('Invalid token');
    }
    req.user = { id: userData.id };

    next();
  } catch (error) {
    return res.status(401).json(setErrorResponse(401, error.message));
  }
};
