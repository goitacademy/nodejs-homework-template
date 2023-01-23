const { httpError } = require("../../helpers");
const { User } = require("../../models/users");

async function subscriptionUpdate(req, res, next) {
  try {
    const { subscription } = req.body;
    const { _id } = req.user;
    const user = await User.findOne({ _id });

    if (!user) {
      throw new httpError(401, "Not authorized");
    }

    const userWithUpdatedSubscriptionType = await User.findByIdAndUpdate(
      _id,
      {
        subscription,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(userWithUpdatedSubscriptionType);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  subscriptionUpdate,
};
