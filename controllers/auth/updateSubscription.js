const { User } = require("../../models/user");
const { HttpError } = require("../../utilities");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const validSubscription = ["starter", "pro", "business"];

  if (!validSubscription.includes(subscription)) {
    throw HttpError(400, "Invalid subscription value");
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch {
    throw HttpError(500);
  }
};

module.exports = updateSubscription;
