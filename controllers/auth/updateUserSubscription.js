const asyncHandler = require("express-async-handler");
const { updateSubscription } = require("../../services/authService");

const updateUserSubscription = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!subscription) {
    return res.status(400).json({ message: `Missing fields subscription` });
  }

  const updatedUser = await updateSubscription(_id, subscription);

  if (!updatedUser) {
    return res.status(400).json({ message: `Subscription is wrong` });
  }

  res.status(200).json(updatedUser);
});

module.exports = { updateUserSubscription };
