const Jimp = require('jimp');

const handleResizeAvatar = async pathToImg => {
    const img = await Jimp.read(pathToImg);
    img.resize(250, 250).write(pathToImg);
};

module.exports = handleResizeAvatar;
