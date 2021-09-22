const { User } = require("../../models");

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null });
  res.json({
    status: "No Content",
    code: 204,
    message: "Success logout",
  });
};

module.exports = logout;
