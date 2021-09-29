const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BadRequest } = require('http-errors');
const { User } = require('../../models');

require('dotenv').config();

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest('Wrong email');
  }
  if (!user.verify) {
    throw new BadRequest('User not found');
  }
  const hashPassword = user.password;
  const compareResult = bcrypt.compareSync(password, hashPassword);
  if (!compareResult) {
    throw new BadRequest('Wrong password');
  }

  const payload = {
    id: user._id,
  };

  const { SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  return res.json({
    token,

    user: {
      email,
      subscription: 'starter',
    },
  });
};

module.exports = login;
