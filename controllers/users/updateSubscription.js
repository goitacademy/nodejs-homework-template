const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!user) {
    throw HttpError(404);
  }
  res.json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = updateSubscription;
