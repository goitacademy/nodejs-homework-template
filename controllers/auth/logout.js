const { User } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    status: "success",
    code: 204,
    data: { message: "No Content" },
  });
};

module.exports = { logout: ctrlWrapper(logout) };
