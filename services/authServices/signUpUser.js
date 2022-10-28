const bcryptjs = require('bcryptjs');
const gravatar = require('gravatar');
const { User } = require('../../models/auth');
const { createReject } = require('../../utils');

const signUpUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    throw createReject(409, 'Email in use');
  }

  const avatarUrl = gravatar.url(email);

  const result = await User.create({
    email,
    password: await bcryptjs.hash(password, 10),
    avatarUrl,
  });

  return {
    email: result.email,
    subscription: result.subscription,
    avatarUrl,
  };
};

module.exports = signUpUser;
