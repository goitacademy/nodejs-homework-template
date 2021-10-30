const { User } = require("../../models");

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.status(204).json({
    status: "No Content",
    code: 204,
  });
};

module.exports = logout;
