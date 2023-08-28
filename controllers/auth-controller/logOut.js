const { User } = require("../../models/users");
const asyncHandler = require("express-async-handler");

const logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.json({
    status: "success",
    code: 204,
    data: { message: "Logout success" },
  });
});

module.exports = logout;
