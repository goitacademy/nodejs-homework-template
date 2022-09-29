const { userModel } = require("../../models/user");

const logout = async (userId) => {
  await userModel.findByIdAndUpdate(userId, { token: null });
};

module.exports = logout;
