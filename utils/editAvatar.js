const Jimp = require("jimp");

const editAvatar = (path, savePath) => {
  return Jimp.read(path)
    .then((img) => img.resize(250, 250).write(savePath))
    .catch((err) => console.log(err.message));
};

module.exports = { editAvatar };
