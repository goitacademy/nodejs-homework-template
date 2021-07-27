const passport = require('passport');

/*
1. Токен невалиден => error = null, user = false
2. Токен валиден но пользователь в базе не найден => error = new Error("Not found")
3. Токен валиден, пользователь найден => error = null, user = {}
*/

const authtenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user || !user.token) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unauthorized',
      });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authtenticate;
