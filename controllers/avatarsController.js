const { updateAvatarURL } = require('../services/userService');

const avatarUploadController = async (req, res) => {
  const { _id: userId } = req.user;
  const avatarURL = req.avatarURL;
  console.log(avatarURL);
  const newUser = await updateAvatarURL(userId, avatarURL);

  res.status(200).json({ newUser, status: 'avatar updated' });
};

module.exports = {
  avatarUploadController,
};
