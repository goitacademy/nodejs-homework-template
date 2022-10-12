const bcrypt = require('bcryptjs');

const { User } = require('../../models/users');

const { RequestError } = require('../../helpers');

const register = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    password: hashPassword,
    email,
    subscription,
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = register;
