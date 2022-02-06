const { User } = require('../../models/user');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(createError(401, 'Email or password is wrong'));
  }
  const compareResult = await bcrypt.compare(password, user.password);
  if (!compareResult) {
    return next(createError(401, 'Email or password is wrong'));
  }

  //   res.status(200).send();

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: { email },
  });
}

module.exports = loginUser;
