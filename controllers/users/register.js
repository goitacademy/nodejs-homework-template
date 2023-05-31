const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const User = require('../../models/user');
const { ctrlWrapper, HttpError } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, 'Email is in use');

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarUrl,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = { register: ctrlWrapper(register) };
