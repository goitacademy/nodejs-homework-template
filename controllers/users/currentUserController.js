const { User } = require('../../models/user');

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true },
  );
  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

module.exports = { getCurrent, updateSubscription };
