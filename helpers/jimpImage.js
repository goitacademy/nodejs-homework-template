const Jimp = require("jimp");

async function jimpAvatar(file) {
  await Jimp.read(file)
    .then((image) => {
      return image.cover(250, 250).write(file);
    })
    .catch((error) => {
      throw error;
    });
}
module.exports = jimpAvatar;
