const path = require("path");
const { resizeAndMoveImage } = require("../helpers/imageHelpers");
const { current } = require("./authService");
const PUBLIC_DIR = "./public";

const updateAvatar = async (file, userId) => {
  const user = await current(userId);
  try {
    const newFileName = await resizeAndMoveImage(file.filename);
    const filePath = path.resolve(PUBLIC_DIR, newFileName);

    user.avatarURL = filePath;
    user.save();

    return user.avatarURL;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  updateAvatar,
};
