const Jimp = require('jimp')

const imagePostProcessing = async path => {
  const img = await Jimp.read(path)
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(path)
}
module.exports = imagePostProcessing