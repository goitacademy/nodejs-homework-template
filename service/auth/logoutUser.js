const { Unauthorized } = require("http-errors");
const { User } = require("../../models/userModel");

const logoutUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Unauthorized("Not authorized");
  }
  await User.findByIdAndUpdate(id, { token: null });
};

module.exports = logoutUser;
