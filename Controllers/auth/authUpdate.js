const { User } = require("../../models/user");


const { ctrlWraper, UpsErrors } = require("../../Helpers");

const update = async (req, res, next) => {
  const { _id , subscription} = req.user;
  const user = await User.findById(_id,subscription);
  if (!user) {
    next(UpsErrors(404, "User not found"));
  }
  user.subscription = subscription;
  await user.save();
res.status(200).json(user);
};

module.exports = ctrlWraper(update);