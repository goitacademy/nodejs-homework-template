const Jimp = require('jimp');

const transformAvatar = async (pathFile) => {
    const pic = Jimp.read(pathFile)
    await (await pic).cover(250, 250)
    .writeAsync(pathFile)
}

module.exports = transformAvatar