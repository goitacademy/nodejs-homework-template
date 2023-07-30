import jwt from 'jsonwebtoken';

import { ctrlWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';
import User from '../models/user.js';

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const errorMessage = 'Not authorized';
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    throw HttpError(401, errorMessage);
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const searchedUser = await User.findById(id);
    if (!searchedUser || !searchedUser.token) {
      throw HttpError(401, errorMessage);
    }
    req.user = searchedUser;
    next();
  } catch (error) {
    throw HttpError(401, errorMessage);
  }
};

export default ctrlWrapper(authenticate);
