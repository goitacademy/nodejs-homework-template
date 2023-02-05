const Jimp = require('jimp');

module.exports = async (file) => {
  const img = await Jimp.read(file);
  img.resize(250, 250, (err) => {
    if (err) throw new Error(err.message);
  });
  return img.writeAsync(file);
};
