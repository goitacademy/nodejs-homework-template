const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('./constants');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const header = req.get('Authorization');
    if (!header) {
      return next({
        status: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      });
    }
    const [, token] = header.split(' ');
    if (!user || err || token !== user.token) {
      return next({
        status: HttpCode.UNAUTHORIZED,
        message: 'Not authorized',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
