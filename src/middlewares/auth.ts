import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnAuthorizedError } from 'helpers/errors';
import { getUserById } from 'services/users.service';
import { IRequest } from 'types/Request.interface';

export const authMiddleware = async (req: IRequest, _res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      next(new UnAuthorizedError('No token provided'));
    }

    const [, token] = authorization!.split(' ');

    if (!token) {
      next(new UnAuthorizedError('No token provided'));
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
    const user = await getUserById(payload!._id);

    if (!user || user.token !== token) {
      return next(new UnAuthorizedError('Invalid token'));
    }
    const { _id, email, subscription, avatarURL } = user;

    req.user = { _id, email, subscription, avatarURL };

    next();
  } catch (err) {
    next(new UnAuthorizedError('Invalid token'));
  }
};
