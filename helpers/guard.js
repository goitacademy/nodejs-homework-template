const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('../config/constants');
const {
  OK,
  CREATED,
  ACCEPTED,
  NO_CONTENT,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = HttpCode;

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    const token = req.get('Authorization')?.split(' ')[1];
    if (!user || error || token !== user.token) {
      return res.status(UNAUTHORIZED).json({
        status: 'error',
        code: UNAUTHORIZED,
        message: 'Invalid login or password',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
