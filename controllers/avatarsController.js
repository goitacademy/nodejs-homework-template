const { updateAvatarURL } = require('../services/userService');

const avatarUploadController = async (req, res) => {
  const { _id: userId, avatarURL } = req.user;
  await updateAvatarURL(userId, avatarURL);

  res.status(200).json({ avatarURL, status: 'success' });
};

module.exports = {
  avatarUploadController,
};
