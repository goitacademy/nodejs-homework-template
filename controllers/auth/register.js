const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');

const { RequestError } = require('../../helpers');

const register = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, 'Email is use');
  }
  const hasPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ email, password: hasPassword });
  res.status(201).json({
    email: result.email,
  });
};
module.exports = register;
