const { User } = require("../../models/user");

const updateUserSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.json({ email: result.email, subscription: result.subscription });
};

module.exports = updateUserSubscription;
