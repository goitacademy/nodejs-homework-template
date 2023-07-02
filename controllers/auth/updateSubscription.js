const HttpError = require("../../helpers/HttpError");
const { User } = require("../../models/user");

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const subscriptions = ["starter", "pro", "business"];

  if (!subscriptions.includes(subscription)) {
    throw HttpError(400, "this subscriptions does not exist");
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  res.status(200).json(updatedUser);
};

module.exports = updateSubscription;
