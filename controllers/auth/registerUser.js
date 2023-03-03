const { Conflict } = require('http-errors');
const { hash } = require('bcryptjs');

const { User } = require('../../models');

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new Conflict('Email in use');
  }

  const hashedPwd = await hash(password, 10);

  await User.create({ name, email, password: hashedPwd });

  res.status(201).json({ user: { name, email } });
};

module.exports = registerUser;