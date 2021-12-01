const bcrypt = require('bcryptjs');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { auth } = require('../../model');
const { User } = auth;
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password))
    throw new Unauthorized('Email or password is wrong');

  const { _id } = user;
  const payload = {
    _id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, { token });

  res.json({
    token,
    user: {
      email,
      subscription: 'starter',
    },
  });
};

module.exports = login;
