const Jimp = require("jimp");

const resize = async (tmpUpload) => {
  const image = await Jimp.read(tmpUpload);
  image.resize(250, 250, function (err) {
    if (err) throw err;
  });
  return image.writeAsync(tmpUpload);
};
module.exports = resize;
