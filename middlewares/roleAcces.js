import { HttpCode } from '../lib/constants';

const roleAccess = role => async (req, res, next) => {
  const userRole = req.user.subscription;
  if (userRole !== role) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: 'error',
      code: HttpCode.FORBIDDEN,
      message: 'Access denied',
    });
  }

  next();
};

export default roleAccess;