import createError from 'http-errors';
import jwt from 'jsonwebtoken'; // JWT

export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new createError(401, 'Authorization required');

    const [type, token] = authorization.split(' ');
    if (!type) throw new createError(401, 'Token type invalid');
    if (!token) throw new createError(401, 'Authorization token required');

    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId };

    next();
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      next(new createError(401, `Token error: ${error.message}`));
    }
    next(error);
  }
};
