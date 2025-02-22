const User = require("../../models/user");

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  res.status(200).json(result);
};

module.exports = updateUserSubscription;
