const Jimp = require('jimp');
const СreateError = require('http-errors');


const resizeAvatar = async(req, res, next) => {

    try {
        if (!req.file) {
            throw new СreateError(400, 'No file to upload')
        }
        const { path: tempDir } = req.file;

        const newAvatar = await Jimp.read(tempDir);
        await newAvatar.resize(250, 250, Jimp.AUTO).quality(75);
        await newAvatar.writeAsync(tempDir);
        next()
    } catch (error) {
        next(error)
    }
}




module.exports = resizeAvatar;