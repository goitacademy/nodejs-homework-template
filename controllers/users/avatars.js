const User = require("../userRequest");
const UploadAvatarService = require("../../services/local-upload");
require("dotenv").config();

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const uploads = new UploadAvatarService(process.env.AVATAR_OF_USERS);
    const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file });
    await User.updateAvatar(id, avatarUrl);
    res.json({ status: "success", code: 200, data: { avatarUrl } });
  } catch (error) {
    next(error);
  }
};

module.exports = avatars;
