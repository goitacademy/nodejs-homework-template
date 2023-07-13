const jimp = require("jimp");

const resizeAvatar = async (filePath, _, width, height) => {
  const avatar = await jimp.read(filePath);
  await avatar.resize(width, height).write(filePath);
};

module.exports = resizeAvatar;


