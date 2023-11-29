const Jimp = require("jimp");

const resizeAvatar = async (url) => {
  await Jimp.read(url).then((avatar) => {
    avatar.resize(250, 250).write(url);
  });
};

module.exports = resizeAvatar;
