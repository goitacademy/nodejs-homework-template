const {
  updateSubscription,
} = require('../../services/users');

module.exports = async (req, res) => {
  const user = await updateSubscription(req);

  res.json({
    status: 'success',
    message: `subscription updated to: ${user.subscription}!`,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
