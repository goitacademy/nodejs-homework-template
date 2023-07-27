const { User } = require("../../models/users");

const { ctrlWrapper, HttpError } = require("../../helpers");

const subscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;

    const allowedSubscriptions = ["starter", "pro", "business"];
    if (!allowedSubscriptions.includes(subscription)) {
      throw new HttpError(400, "Invalid subscription value");
    }

    const userId = req.user.id;

    const updatedUser = await User.updateSubscription(userId, subscription);

    res.json({ subscription: updatedUser.subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  subscription: ctrlWrapper(subscription),
};
