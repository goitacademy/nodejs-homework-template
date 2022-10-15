const { userModel } = require("../../models/user");

const getByVerifyToken = async (token) => {
  const data = await userModel.findOne(token);
  return data;
};

module.exports = getByVerifyToken;
