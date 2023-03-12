const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (request, response) => {
  const { _id } = request.user;
  const { path: tempUpload, originalname } = request.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);
  await fs.rename(tempUpload, resultUpload);

  const file = await Jimp.read(resultUpload);
  const fileResize = await file.resize(250, 250);
  await fileResize.write(resultUpload);

  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  response.status(200).json({
    status: "success",
    code: 200,
    avatarURL,
  });
};

module.exports = updateAvatar;
