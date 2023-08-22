const Jimp = require('jimp');

const resizeAvatar = async (req, res, next) => {
    try {
        const { file } = req;

        const avatar = await Jimp.read(file.path);
        avatar.cover(250, 250).write(file.path);

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = resizeAvatar;
