const { Strategy } = require("passport-google-oauth2");
const { User } = require("../../models");
const gravatar = require("gravatar");

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET_KEY, GOOGLE_CALLBACK_URL, APP_URL } =
  process.env;

const callbackURL = `${APP_URL}${GOOGLE_CALLBACK_URL}`;
const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_SECRET_KEY,
  callbackURL,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName, picture, email_verified: verify } = profile;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
      // запись выше равна этому выражению req.user = user;
    }
    const avatarURL = picture || gravatar.url(email);
    const newUser = await User.create({
      email,
      name: displayName,
      avatarURL,
      verify,
      verificationToken: accessToken,
    });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

module.exports = googleStrategy;
