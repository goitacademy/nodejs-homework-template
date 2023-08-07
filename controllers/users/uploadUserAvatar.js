const ctrlWrapper = require("../../utils/ctrlWrapper");

const { updateUserAvatar } = require("../../services/userServices");

const uploadUserAvatar = async (req, res) => {
  const { avatarURL } = req.user;
  await updateUserAvatar(req);
  res.json({ avatarURL });
};

module.exports = { uploadUserAvatar: ctrlWrapper(uploadUserAvatar) };
