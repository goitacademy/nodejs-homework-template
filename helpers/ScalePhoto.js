const Jimp = require("jimp");

const ScalePhoto = async (path) => {
    const image = await Jimp.read(path);
    image.resize(250, 250);
    image.write(path);
};

module.exports = ScalePhoto;