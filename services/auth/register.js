const { userModel } = require("../../models/user");

const register = async (email, password) => {
  const data = await userModel.create({ email, password });
  return data;
};

module.exports = register;
