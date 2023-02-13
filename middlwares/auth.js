const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();
require('../config/config-passport');

const auth = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err || !user.token) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
