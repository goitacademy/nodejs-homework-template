const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  // res.status(204).json();
  res.json({
    status: "success",
    code: 204,
    message: "No Content",
  });
};

module.exports = logout;
