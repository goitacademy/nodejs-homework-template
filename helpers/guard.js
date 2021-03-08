const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('./constants');

const guard = (req, res, next) => {
  const [, token] = req.get('Authorization').split(' ');

  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err || token !== user.token) {
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
