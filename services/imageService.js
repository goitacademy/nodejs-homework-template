const multer = require('multer');
const Jimp = require("jimp");
const path = require("path");
const uuid = require("uuid").v4;
const fse = require("fs-extra");
const AppError = require('../utils/appError');
const sharp = require('sharp');

class ImageService {
    static upload(name) {
        console.log(name)
        const multerStorage = multer.diskStorage({
  destination: (req, file, callbackfunc) => {
    callbackfunc(null, 'tmp');
  },
  filename: (req, file, callbackfunc) => {
    const extension = file.mimetype.split('/')[1];
    callbackfunc(null, `${req.user._id}-${uuid()}.${extension}`);
  }
});

        const multerFilter = (req, file, callbackfunc) => {
            if (file.mimetype.startsWith('image/')) {
                callbackfunc(null, true);
            } else {
                callbackfunc(new AppError(400, 'Please, upload images only!'), false);
            }
        };

        return multer({
            storage: multerStorage,
            fileFilter: multerFilter,
        }).single(name);
    }

    static async save(file, options, ...pathSegments) {
        const fileName = `${uuid()}.jpeg`;
        const fullFilePath = path.join(process.cwd(), 'public/avatars', ...pathSegments);

        await fse.ensureDir(fullFilePath);
        await sharp(file.buffer)
            .resize(options || { height: 250, width: 250 })
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(path.join(fullFilePath, fileName));
        
        return path.join(...pathSegments, fileName)
}

}

module.exports = ImageService;