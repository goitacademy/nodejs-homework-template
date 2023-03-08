const { User } = require("../../models");
const logoutUser = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
};
module.exports = logoutUser;
