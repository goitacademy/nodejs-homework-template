const fs = require("fs-extra");
const Jimp = require("jimp");
const { User } = require("../../db");

const avatarService = async (filePath, userId) => {
  const newName = `${userId}-avatar.jpg`;
  const avatarUrl = `/avatars/${newName}`;

  const avatar = await Jimp.read(filePath);
  await avatar
    .resize(250, 250)
    .quality(60)
    .write(`./public/avatars/${newName}`);

  await fs.remove(filePath);
  await User.findByIdAndUpdate(userId, { $set: { avatarURL: avatarUrl } });
  return avatarUrl;
};

module.exports = { avatarService };
