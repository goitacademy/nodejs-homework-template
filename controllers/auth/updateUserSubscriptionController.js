const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const updateUserSubscriptionController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    { new: true }
  );

  if (!updatedUser) throw new Unauthorized("Not authorized");

  res.status(200).json(updatedUser);
};

module.exports = updateUserSubscriptionController;
