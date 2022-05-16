const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models/user");

const signup = async (req, res) => {
  const { password, email, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} is already exist`);
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, subscription, avatarURL });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({ email, subscription, avatarURL });
};

module.exports = signup;
