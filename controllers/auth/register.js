const bcrypt = require('bcrypt');

const { User } = require('../../models');

const { HttpError } = require('../../help');

const userRegister = async (req, res) => {
  const { email, password } = req.body;

  const validEmail = await User.findOne({ email });

  if (validEmail) {
    throw HttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  return res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = userRegister;
