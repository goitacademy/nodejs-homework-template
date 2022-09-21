const { User } = require("../../models");

const updateAvatar = async (id, avatarURL) => {
  const user = await User.findByIdAndUpdate(id, { avatarURL });
  return user;
};

module.exports = updateAvatar;
