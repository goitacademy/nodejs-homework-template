const HttpError = require('../helpers/HttpError');
const authService = require('../services/AuthService');

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return next(HttpError(401));
  }

  try {
    const user = await authService.authenticate(token);
    if (!user?.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (err) {
    next(HttpError(401, err.message));
  }
};

module.exports = authenticate;
