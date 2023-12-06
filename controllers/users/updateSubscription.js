const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  const { subscription } = req.body;

  const validSubscriptions = ["startert", "pro", "business"];
  if (!validSubscriptions.includes(subscription)) {
    throw HttpError(400, "Invalid subscription value");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );

  if (!updatedUser) {
    throw HttpError(400, "User not found");
  }
  res.json({
    user: {
      email: req.user.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = updateSubscription;
