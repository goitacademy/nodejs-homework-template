const User = require("../../models/users");
const HttpError = require("../../helpers/HttpError");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id: userId } = req.user;

  if (!["starter", "pro", "business"].includes(subscription)) {
    throw new HttpError(400, "Invalid subscription value");
  }

  const updatedUser = await User.findByIdAndUpdate(userId, { subscription }, { new: true });

  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

module.exports = updateSubscription;