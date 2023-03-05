const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401);
  }

  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = getCurrent;
