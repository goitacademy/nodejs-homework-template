const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email: ${email} in use`);
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, subscription, avatarURL });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = { signup };
