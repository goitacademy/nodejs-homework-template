const passport = require('passport');

const authenticate = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user || !user.token) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unauthenticated',
      });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticate;
