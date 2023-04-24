const Jimp = require("jimp");

const optimizesAvatar = async (uploadFile) => {
  const refactoredImag = await Jimp.read(uploadFile);
  refactoredImag.resize(250, 250).quality(60).writeAsync(uploadFile);
};
module.exports = optimizesAvatar;
