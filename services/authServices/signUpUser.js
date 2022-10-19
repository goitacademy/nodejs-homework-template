const bcryptjs = require('bcryptjs');
const { User } = require('../../models/auth');
const { createReject } = require('../../utils');

const signUpUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw createReject(409, 'Email in use');
  }
  const result = await User.create({
    email,
    password: await bcryptjs.hash(password, 10),
  });

  return { email: result.email, subscription: result.subscription };
};

module.exports = signUpUser;
