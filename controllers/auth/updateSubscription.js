const User = require("../../models/users");

const updateSubscription = async (req, res) => {
  const { body } = req;
  const user = req.user;

  const result = await User.findByIdAndUpdate(
    user.userId,
    { subscription: body.subscription },
    { new: true }
  );

  res.json(result);
};

module.exports = updateSubscription;
