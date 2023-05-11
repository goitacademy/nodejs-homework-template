const { User } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../helpers");

const subscription = async (req, res) => {
  const typesOfSubscriptions = ["starter", "pro", "business"];
  const { _id } = req.user;
  const newSubscription = req.body.subscription;

  if (!typesOfSubscriptions.includes(newSubscription)) {
    throw HttpError(400, "Invalid subscription value");
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription: newSubscription },
    { new: true }
  );

  if (!user) {
    throw HttpError(404, "User not found");
  }

  res.status(200).json({ message: "Subscription updated", user });
};

module.exports = ctrlWrapper(subscription);
