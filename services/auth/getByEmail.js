const { userModel } = require("../../models/user");

const getByEmail = async (email) => {
  const data = await userModel.findOne(email);
  return data;
};

module.exports = getByEmail;
