const ERROR_TYPES = require("../adapters/express/contastants/errorTypes");
const createError = require("../untils/createError");
const passport = require('../auth/index');
const userService = require('../services/users')
require('../auth')
const auth = async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user) => {
      if (error) {
         next(error);
      }
      if (!user) {
        const error = createError(ERROR_TYPES.UNAUTHORIZED, {
          message: "Not authorized",
        });
        next(error);
      }
          req.user = user;
          next()
    })(req,res,next);
};
module.exports = auth;
