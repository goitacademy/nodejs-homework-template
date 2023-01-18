const Jimp = require('jimp');

const resize = async(path) => {
    const image = await Jimp.read(path);
    await image.resize(250, 250).writeAsync(path);
}

module.exports = resize;