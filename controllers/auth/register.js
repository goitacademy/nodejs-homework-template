const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { User } = require('../../models');

const register = async (req, res) => {
  const { subscription, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict('Email in use');
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await User.create({
    subscription,
    email,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
