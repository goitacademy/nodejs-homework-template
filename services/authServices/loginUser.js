const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/auth');
const { createReject } = require('../../utils');

const loginUser = async ({ email, password }) => {
  const [user] = await User.find({ email });

  if (!user) {
    throw createReject(401, 'Email or password is wrong');
  }

  if (user.password && !(await bcryptjs.compare(password, user.password))) {
    console.log('second err');
    throw createReject(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return { token, user };
};

module.exports = loginUser;
