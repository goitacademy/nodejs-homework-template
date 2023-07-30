import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { controllerWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';
import User from '../models/user.js';

// ####################################################

const secret = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') throw HttpError(401);

  try {
    const payload = jwt.verify(token, secret); // if true, returns payload
    const { id } = payload;

    const user = await User.findById(id);
    if (!user) throw HttpError(401);

    req.user = user;

    next();
  } catch {
    throw HttpError(401, 'WTF');
  }
};

export default controllerWrapper(authenticate);
