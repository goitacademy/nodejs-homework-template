const User = require("../models/user.model");

const userLogout = async (id) =>
  await User.findByIdAndUpdate(id, { token: null });


  
const updateAvatar = async (userId, avatarURL) => {
  return User.findByIdAndUpdate(userId, { avatarURL });
};

module.exports = { userLogout, updateAvatar };
