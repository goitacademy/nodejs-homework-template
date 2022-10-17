const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const { RequestError } = require('../../helpers');

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, 'Email or password wrong');
  }
  const hasPassword = await bcrypt.compare(password, user.password);
  if (!hasPassword) {
    throw RequestError(401, 'Email or password wrong');
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(201).json({
    token,
  });
};
module.exports = login;
