const User = require("../../models/user.js");
const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { subscription } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { subscription },
      { new: true }
    );
    if (!user || !user.token) {
      throw new HttpError(401, "Not authorized");
    }
    const userData = {
      email: user.email,
      subscription: user.subscription,
    };
    console.log(`Subscription updated successfully`.success);
    res
      .status(200)
      .json({ message: `Subscription updated successfully`, userData });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
