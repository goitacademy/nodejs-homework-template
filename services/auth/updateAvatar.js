const { userModel } = require("../../models/user");

const updateAvatar = async (userId, avatarURL) => {
  const data = await userModel.findByIdAndUpdate(userId, avatarURL, {
    new: true,
  });
  return data;
};

module.exports = updateAvatar;
