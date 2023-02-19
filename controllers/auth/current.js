const { UserModel } = require("../../models");

const current = async (req, res, next) => {
  const { _id } = req.user;
  const currentUser = await UserModel.findById(_id);

  res.status(200).json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
};

module.exports = {
  current,
};
