const jimp = require('jimp');

const jimpedAvatar = async (readFilePath, writeFilePath) => {
  const image = await jimp.read(readFilePath);
  image.resize(250, 250);
  return await image.writeAsync(writeFilePath);
};
module.exports = { jimpedAvatar };