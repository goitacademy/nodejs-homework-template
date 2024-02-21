const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../service/schemas/user");
require("dotenv").config();
const SECRET = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: SECRET,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, (payload, done) => {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return res.status(401).json({
      status: "error",
      message: "Not authorized",
      data: "Unauthorized",
    });
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.token !== token || !user.token) {
      return res.status(401).json({
        status: "error",
        message: "Not authorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({
      status: "error",
      message: "Not authorized",
      data: "Unauthorized",
    });
  }
};

module.exports = { auth };
