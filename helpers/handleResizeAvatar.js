const Jimp = require('jimp');

const handleResizeAvatar = async pathToImg => {
    Jimp.read(pathToImg)
        .then(image => {
            image.resize(250, 250);
            console.log(image);
            // return image.resize(250, 250);
        })
        .catch(err => {
            console.error(err);
        });
};

module.exports = handleResizeAvatar;

// Jimp.read('./path/to/image.jpg');
