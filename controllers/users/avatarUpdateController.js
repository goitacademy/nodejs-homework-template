const path = require("path");
const { avatarUpdate } = require("../../service/users");
const Jimp = require("jimp");
const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const fs = require("fs/promises");
const avatarUpdateController = async (req, res) => {
  const { id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const extention = originalname.split(".").pop();
  const filename = `${id}.${extention}`;

  const resultUpload = await Jimp.read(tempUpload);
  await resultUpload.resize(250, 250).write(path.join(avatarDir, filename));
  const avatarURL = path.join("avatars", filename);
  fs.unlink(tempUpload);
  await avatarUpdate(id, avatarURL);
  res.json({ status: "success", data: { avatarURL } });
};

module.exports = avatarUpdateController;
