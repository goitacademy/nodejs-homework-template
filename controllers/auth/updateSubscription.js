const User = require("../../models/users");

const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOneAndUpdate({ email }, req.body, { new: true });
  if (!user) {
    throw HttpError(409, "Email in use");
  }

  res.status(200).json({
    user,
  });
};
module.exports = updateSubscription;
