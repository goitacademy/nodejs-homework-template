const { User } = require("../../models/user.js");
const { RequestError } = require("../../helpers");

const getCurrentUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw RequestError(401, "Not authorized");
  }
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = getCurrentUser;
