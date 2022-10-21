const { User } = require("../../models/users");

const logout = async (req, res, next) => {
  const id = req.user._id;
  await User.findByIdAndUpdate(id, { token: "" });

  res.status(204).json();
};

module.exports = logout;
