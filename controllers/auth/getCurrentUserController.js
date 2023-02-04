const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const getCurrentUserController = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id });

  if (!user) throw new Unauthorized("Not authorized");

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = getCurrentUserController;
