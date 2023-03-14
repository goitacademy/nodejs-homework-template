const { User } = require("../../models");
const avatarUpdate = async (id, avatarURL) => {
  const data = await User.findByIdAndUpdate(id, { avatarURL });
  return data;
};
module.exports = avatarUpdate;
