const { User } = require("../../model/user");

const subscriptionStatus = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const updatedSubscription = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.status(201).json({
    email: updatedSubscription.email,
    subscription: updatedSubscription.subscription,
  });
};

module.exports = subscriptionStatus;
