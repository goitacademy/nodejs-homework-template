const multer = require('multer');
const path = require('path');
const Jimp = require("jimp");
const { HttpError } = require('../helpers');

const tempDir = path.join(__dirname, '../', 'tmp');

const mutlerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

class ImageUploader {
    static upload(name) {
        const multerFilter = (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true)
            } else {
                return HttpError(400, 'Only images can be upload')
            }
        }

        return multer({
            storage: mutlerConfig,
            fileFilter: multerFilter,
        }).single(name)
    }

    static async save(req, res, next) {
        console.log(req, 'file in save')

        const img = `${tempDir}\\${req.file.originalname}`;

        try {
           const resizedImg =  await Jimp.read(img)
            resizedImg
                .resize(250, 250)
                .quality(80)
                .write(img);

            next();
        }
        catch (error) {
            console.log(error)
            next(HttpError(404, 'Something went wrong'))
        };
    }
}

module.exports = ImageUploader;