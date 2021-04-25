const passport = require("passport");
var { Strategy, ExtractJwt } = require("passport-jwt");

const { UsersService } = require("../service");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
//перехватыевает беар токен, достает, расшифровывает и кладет как объект в payload
passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const service = new UsersService();
      //id из token который мы положили в service/auth
      const user = await service.findById(payload.id);

      if (!user) {
        return done(new Error("User not found"));
      }

      if (!user.token) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      done(e);
    }
  })
);
