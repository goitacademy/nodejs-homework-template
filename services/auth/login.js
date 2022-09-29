const { userModel } = require("../../models/user");

const login = async (userId, token) => {
  await userModel.findByIdAndUpdate(userId, { token });
};

module.exports = login;
