const { User } = require('../../models/user');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');

async function addUser(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new createError(409, 'Email in use');
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  await User.create({ email, password: hashPassword });
  res.status(201).json({
    user: {
      email,
    },
  });
}

module.exports = addUser;
