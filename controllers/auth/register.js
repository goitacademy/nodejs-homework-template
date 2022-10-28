const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { RequestError } = require('../../helpers');

const register = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email is use');
  }
  const hasPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hasPassword,
    avatarURL,
  });
  res.status(201).json({
    email: result.email,
  });
};
module.exports = register;
