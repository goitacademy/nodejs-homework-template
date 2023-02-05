const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const getCurrentUserController = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await User.findOne(
    { _id },
    { email: 1, subscription: 1 }
  );

  if (!currentUser) throw new Unauthorized("Not authorized");

  res.status(200).json(currentUser);
};

module.exports = getCurrentUserController;
