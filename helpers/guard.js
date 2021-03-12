const passport = require('passport');
require('../config/pasport');
const { HttpCode } = require('./constans');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    const [, token] = req.get('Authorization').split(' ');
    if (!user || error || token !== user.token) {
      return res.status(HttpCode.FORBIDDEN).json({
        status: 'error',
        code: HttpCode.FORBIDDEN,
        data: 'Forbidden',
        message: 'Access is denied',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
