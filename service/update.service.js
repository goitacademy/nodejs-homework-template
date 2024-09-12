const User = require("../models/user.model");

const updateAvatar = async (id, avatarURL) => {
  const response = await User.findOneAndUpdate(
    { _id: id },
    { avatarURL },
    { new: true }
  );
  return response;
};

module.exports = {
  updateAvatar,
};
