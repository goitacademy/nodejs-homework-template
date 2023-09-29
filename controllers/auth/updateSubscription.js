const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOneAndUpdate(
    { _id },
    { subscription: req.body.subscription },
    { new: true }
  );

  const { email, subscription } = user;

  res.status(200).json({ email, subscription });
};

module.exports = updateSubscription;
