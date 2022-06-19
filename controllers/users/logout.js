const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  return res.status(204).json();
};

module.exports = { logout };
