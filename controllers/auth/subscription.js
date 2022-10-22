const { User } = require("../../models/users");

const subscription = async (req, res, next) => {
  const { subscription } = req.body;

  await User.findByIdAndUpdate(req.user._id, { subscription });

  res.json({ message: "subscription changed" });
};

module.exports = subscription;
