const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

const signup = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }
  const avatarURL = gravatar.url(email, {
    protocol: 'http',
    s: '250',
  });

  const newUser = new User({
    email,
    password: await bcrypt.hash(password, 10),
    avatarURL,
  });
  await newUser.save();
  res.json({
    user: {
      email: email,
      avatarURL: avatarURL,
    },
  });
};

module.exports = signup;
