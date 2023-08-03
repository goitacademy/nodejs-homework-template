const { User } = require('../../models/user');

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!req.user) {
    throw HttpError(401, 'Not authorized');
  }

  await User.findByIdAndUpdate(_id, { subscription }, { new: true });

  res.status(200).json({
    message: `Your subscription is now ${subscription}`,
  });
};

module.exports = {
  updateSubscription,
};
