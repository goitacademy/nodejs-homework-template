const fs = require("fs").promises;
const path = require("path");
const { updateUser } = require("../../services");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

const changeAvatarController = async (req, res) => {
  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const extention = originalname.split(".").pop();
  const filename = `${id}.${extention}`;

  const resultUpload = await Jimp.read(tempUpload);
  resultUpload.resize(250, 250).write(path.join(avatarsDir, filename));

  const avatarURL = path.join("avatars", filename);

  await updateUser(id, {avatarURL: avatarURL});
  
  fs.unlink(tempUpload);

  return res.status(200).json({ message: `avatarURL: ${avatarURL}` });
};

module.exports = changeAvatarController;
