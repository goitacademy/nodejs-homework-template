const User = require("../../models/user");

const getCurrent = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  res.json({ user: { email: user.email, subscription: user.subscription } });
};

module.exports = getCurrent;
