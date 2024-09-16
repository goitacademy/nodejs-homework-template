const Jimp = require('jimp');

const resizeImage = async (imageURL) => {
    const image = await Jimp.read(imageURL);
    image.resize(250, 250);
    image.write(imageURL)
}

module.exports = resizeImage;