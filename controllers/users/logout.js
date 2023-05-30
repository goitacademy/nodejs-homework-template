const asyncHandler = require("express-async-handler");
const { UserServices } = require("../../services");

const logout = asyncHandler(async (req, res) => {
  const { id } = req.user;
  await UserServices.logout(id);
  res.status(204);
});

module.exports = logout;
