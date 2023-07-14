const { User } = require("../../models/user");

const patchSubscription = async (req, res) => {
  const { email } = req.user;
  const { subscription } = req.body;
  const result = await User.findOneAndUpdate(
    { email },
    {
      subscription: subscription,
    },
    { new: true }
  );
  res.json(result);
};

module.exports = patchSubscription;
