const {
  updateSubscription,
} = require('../../services/users');

module.exports = async (req, res) => {
  const user = await updateSubscription(req);

  res.status(200).json({
    status: 'success',
    message: `subscription updated to: ${user.subscription}!`,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
