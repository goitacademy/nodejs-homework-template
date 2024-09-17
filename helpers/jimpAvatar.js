const Jimp = require("jimp");

const jimpAvatar = async (image) => {
  await Jimp.read(image)
    .then((avatar) => avatar.cover(250, 250).write(image))
    .catch((err) => {
      throw err;
    });
};

module.exports = jimpAvatar;
