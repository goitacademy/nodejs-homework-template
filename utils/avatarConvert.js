const Jimp = require('jimp')

const avatarConvert = async (filePath) => {
  const img = await Jimp.read(filePath)
  await img
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
    .writeAsync(filePath)
}

module.exports = avatarConvert
