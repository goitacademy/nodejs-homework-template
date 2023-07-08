const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');

const { HttpError } = require('../../helpers');

require('dotenv').config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  const loginedUser = await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: { email: loginedUser.email, subscription: loginedUser.subscription },
  });
};

module.exports = login;