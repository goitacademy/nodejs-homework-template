const User = require("../../models/users");
const { ctrlWrapper } = require("../../helpers");

const logout = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { token: null }).exec();
  res.status(204).end();
};

module.exports = {
  logout: ctrlWrapper(logout),
};
