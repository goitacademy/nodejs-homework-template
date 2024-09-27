const Jimp = require("jimp");

const modifyImage = async (image) => {
    const resizedImage = await Jimp.read(image)
    await resizedImage
        .resize(256, 256)
        .quality(60)
        .writeAsync(image)
};

module.exports = modifyImage;
