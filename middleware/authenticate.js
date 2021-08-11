const passport = require('passport');
const HTTP_STATUS = require('../utils/httpStatusCodes');

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user || !user.token) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: 'Error',
        code: HTTP_STATUS.UNAUTHORIZED,
        message: 'Not authorized',
      });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticate;