const { userModel } = require("../../models/user");

const register = async (email, password, avatarURL, verificationToken) => {
  const data = await userModel.create({
    email,
    password,
    avatarURL,
    verificationToken,
  });
  return data;
};

module.exports = register;
