const jimp = require('jimp');

module.exports = async (imagePath) => {
    const image = await jimp.read(`${imagePath}`);
    image.resize(250, 250);
    return await image.write(`${imagePath}`);

}