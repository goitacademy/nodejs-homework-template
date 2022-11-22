const passport = require("passport");

const { googleStrategy, facebookStrategy } = require("./strategies");

passport.use("google", googleStrategy);
passport.use("facebook", facebookStrategy);

module.exports = passport;
