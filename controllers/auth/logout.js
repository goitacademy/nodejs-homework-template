const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  const storedUser = await User.findByIdAndUpdate(_id, { token: null });

  if (!storedUser) {
    throw Unauthorized("Not authorized");
  }
  return res.status(204).json({ message: "No Content" });
};

module.exports = logout;