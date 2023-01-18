const { Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');

const { User } = require('../../models');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`Email or password is wrong`);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new Unauthorized(`Email or password is wrong`);
  }
};

module.exports = login;
