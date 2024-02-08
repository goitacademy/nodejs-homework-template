const Jimp = require("jimp") ;

const fs = require("node:fs/promises");
const path = require("node:path");
const avatarsDir = path.resolve("public", "avatars");
const { User } = require("../models/user");


async function getAvatar(req, res, next) {
  try {
    const user = await User.findById(req.user.id);

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.avatar === null) {
      return res.status(404).send({ message: "Avatar not found" });
    }

    res.sendFile(path.join(__dirname, "..", "public/avatars", user.avatar));
  } catch (error) {
    next(error);
  }
}

async function uploadAvatar(req, res, next) {
  
 
  const { path: tempUpload, originalname } = req.file;
  console.log(req.file);
  const filename = `${req.user.id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);

  Jimp.read(tempUpload, (err, image) => {
    if (err) throw err;
    image.resize(250, 250).write(resultUpload); // resize
  });
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = filename;
  await User.findByIdAndUpdate(req.user.id, { avatar:avatarURL });
  res.status(200).json({ avatar:avatarURL });
}
module.exports = { uploadAvatar, getAvatar };