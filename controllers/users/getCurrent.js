const { User } = require('../../models');
const { Unauthorized } = require('http-errors');

const getCurrent = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user) {
    throw Unauthorized('Not authorized');
  }
  res.status(201).json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = { getCurrent };
