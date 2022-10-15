const { userModel } = require("../../models/user");

const verifyEmail = async (userId) => {
  const data = await userModel.findByIdAndUpdate(userId, {
    verified: true,
    verificationToken: null,
  });
  return data;
};

module.exports = verifyEmail;
