const { userSchema } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  await userSchema.User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logout;
