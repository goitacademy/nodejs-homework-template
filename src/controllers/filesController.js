const { updateAvatar } = require("../services/filesService");

const updateAvatarController = async (req, res) => {
  const file = req.file;
  const userId = req.user._id;
  const avatarURL = await updateAvatar(file, userId);
  res.status(200).json({ avatarURL });
};

module.exports = {
  updateAvatarController,
};
