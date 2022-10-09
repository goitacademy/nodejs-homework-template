const { userModel } = require("../../models/user");

const register = async (email, password, avatarURL) => {
  const data = await userModel.create({ email, password, avatarURL });
  return data;
};

module.exports = register;
