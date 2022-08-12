const fs = require("fs/promises");
const jimp = require("jimp");
const path = require("path");
const FILE_DIR = path.resolve("./public");
const { updateAvatar } = require("../services/usersService");

const avatarController = async (req, res) => {
  const { _id: userId } = req.user;
  const { file } = req;
  let avatar = file.path;
  const img = await jimp.read(avatar);
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(avatar);

  avatar = path.basename(file.path);
  const newUser = await updateAvatar(userId, avatar);

  res.json({ newUser, status: "success" });
};

module.exports = {
  avatarController,
};

// path.basename()
