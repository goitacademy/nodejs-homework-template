const {
  userModel: { User },
} = require("../../models");

const updateUserSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(_id, subscription);
  res.json({ result, message: "User subscription updated successfully" });
};

module.exports = updateUserSubscription;
