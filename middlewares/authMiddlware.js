const passport = require('passport');
require('../configs/passport-config');

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    console.log(user);
    if (error || !user || !user.token) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unathorized',
      });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { authenticate };
