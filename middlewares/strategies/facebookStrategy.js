const { Strategy } = require("passport-facebook");
const gravatar = require("gravatar");
const { User } = require("../../models");

const { FACEBOOK_CLIENT_ID, FACEBOOK_SECRET_KEY, FACEBOOK_CALLBACK_URL } =
  process.env;

const facebookParams = {
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_SECRET_KEY,
  callbackURL: FACEBOOK_CALLBACK_URL,
  profileFields: ["id", "displayName", "email", "photos"],
};

const facebookCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const { emails, displayName, photos } = profile;
    const email = emails[0].value;
    const photo = photos[0].value;
    const avatarURL = photo || gravatar.url(email);
    const user = await User.findOne({ email });

    if (user) {
      return done(null, user);
      // запись выше равна этому выражению req.user = user;
    }
    const newUser = await User.create({
      email,
      name: displayName,
      avatarURL,
      verificationToken: accessToken,
    });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const facebookStrategy = new Strategy(facebookParams, facebookCallback);

module.exports = facebookStrategy;
