const { User, HttpError } = require("../../models");
const gravatar = require("gravatar");

const signup = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return next(new HttpError(409, "Email in use"));
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    user: {
      email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

module.exports = signup;
