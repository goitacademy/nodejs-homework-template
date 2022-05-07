const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');
const { createError } = require('../../helpers');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, `Email "${email}" in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const { subscription } = await User.create({ email, password: hashPassword });

  res.status(201).json({
    status: 'Created',
    code: 201,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = signup;
