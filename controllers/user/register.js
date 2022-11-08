const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { User } = require('../../models/user');
const { requestError } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;

  const candidate = await User.findOne({ email });

  if (candidate) {
    throw requestError(409, 'Email in use');
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: { email, subscription: result.subscription, avatarURL },
    },
  });
};

module.exports = register;
