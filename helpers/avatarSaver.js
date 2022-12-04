const fs = require("fs").promises;
const jimp = require("jimp");
const path = require("path");
const { AVATARS_DIR } = require("../helpers/fileUpload");
const { v4: uuidv4 } = require("uuid");

const avatarRenameAndSave = async (avatarPath) => {
  if (avatarPath) {
    const avatar = await jimp.read(avatarPath);
    await avatar
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(avatarPath);
    const newName = [];
    newName.push(uuidv4());
    newName.push(avatarPath.split(".")[1]);

    const avatarPublicPath = path.join(AVATARS_DIR, newName.join("."));
    await fs.rename(avatarPath, avatarPublicPath);
    const lastFolder = AVATARS_DIR.split("\\").length - 1;
    const avatarURL =
      "/" +
      AVATARS_DIR.split("\\")[lastFolder] +
      "/" +
      newName.join(".");
    return avatarURL;
  }
};

const avatarDelete = async (avatarURL) => {
  try {
    const avatarName = avatarURL.split("/")[2];
    const avatarPublicPath = path.join(AVATARS_DIR, avatarName);
    await fs.unlink(avatarPublicPath);
  } catch (err) {}
};
module.exports = {
  avatarRenameAndSave,
  avatarDelete,
};
