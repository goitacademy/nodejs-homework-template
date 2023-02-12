const Jimp = require("jimp");

const editAvatar = (path, savePath) => {
  return Jimp.read(path)
    .then((img) => img.resize(250, 250).write(savePath))
    .catch((e) => console.log(e.message));
};

module.exports = { editAvatar };
