const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
const { requestError } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;

  const candidate = await User.findOne({ email });

  if (candidate) {
    throw requestError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: { email: result.email, subscription: result.subscription },
    },
  });
};

module.exports = register;
