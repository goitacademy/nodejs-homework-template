const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("../constants/env");
const userService = require("../services/users");
const createError = require("../untils/createError");
const ERROR_TYPES = require("../adapters/express/contastants/errorTypes");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

const jwtStrategy = new Strategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
      ]),
    },
    async (payload, done) => {
      try {
        const user = await userService.findUserById(payload.sub);
        if (user) {
          return done(null, user);
        } else {
          const err = createError(ERROR_TYPES.UNAUTHORIZED, {
            message: 'Unauthorized',
          });
          return done(err, null);
        }
      } catch (err) {
        return done(err, null);
      }
    },
  );


passport.use(jwtStrategy);
module.exports = passport;