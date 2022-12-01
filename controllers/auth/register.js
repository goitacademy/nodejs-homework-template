const bcrypt = require('bcryptjs');
const { HTTPError } = require('../../helpers');
const { User } = require('../../models/user');

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HTTPError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashPassword, subscription });
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
