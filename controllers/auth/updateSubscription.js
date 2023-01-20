const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;

  await User.updateOne({ subscription });

  res.status(204).json();
};

module.exports = updateSubscription;