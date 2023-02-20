const { User } = require('../../schemas/modelUser');

const updateAvatar = async (id, avatarURL) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { avatarURL: avatarURL },
    { new: true }
  );
};

module.exports = { updateAvatar };
