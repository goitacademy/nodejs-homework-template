const Jimp = require('jimp');

async function resizeImage(path) {
    try {
        const image = await Jimp.read(path);
        await image.resize(250, 250);
        await image.writeAsync(path);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = resizeImage;
