const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const updateUserStatus = async (req, res) => {
  const { _id: userId } = req.user;
  const { subscription } = req.body;

  const subscriptions = ["starter", "pro", "business"];

  if (!subscriptions.includes(subscription)) throw HttpError(400);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { subscription },
    { new: true }
  );

  res.json({
    email: updatedUser?.email,
    subscription: updatedUser?.subscription,
  });
};

module.exports = updateUserStatus;
