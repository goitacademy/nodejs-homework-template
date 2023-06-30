const { User } = require("../../models");

const subscription = async (req, res) => {
  const id = req.user._id;
  const { subscription } = req.body;

  const newSubscription = await User.findByIdAndUpdate(id, { subscription });

  res.json({
    newSubscription,
    message: "User subscription updated successfully",
  });
};

module.exports = subscription;
