const { User } = require('../../models/user');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

async function addUser(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, 'Email in use');
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);
  await User.create({ email, avatarURL, password: hashPassword });
  res.status(201).json({
    user: {
      email,
    },
  });
}

module.exports = addUser;
