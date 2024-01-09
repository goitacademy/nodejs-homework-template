const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const fsE = require('fs-extra');
const Jimp = require('jimp');
const { HttpError } = require('../helpers');
const { constants } = require('../vars');
const { serverConfig } = require('../configs');

class ImageService {
    static initUploadImageMiddleware(fieldName) {
        const storage = multer.memoryStorage();
        const fileFilter = (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new HttpError(400, 'Upload image only!'));
            }
        };
        return multer({
            storage,
            fileFilter,
            limits: {
                fileSize: 2 * constants.oneMbSize,
            },
        }).single(fieldName);
    }

    static #DefaultSaveOptions = {
        width: 200,
        height: 200,
        quality: 90,
        maxFileSize: 1
    };

    static async saveImages(file, options, ...pathSegments) {
        options = {
            ...this.#DefaultSaveOptions,
            ...options,
        };
        if (file.size > options.maxFileSize * constants.oneMbSize || file.size > serverConfig.MAX_FILE_SIZE_UPLOAD)
            throw new HttpError(400, 'File is too large');

        const fileName = `${crypto
            .createHash('md5')
            .update(Date.now().toString(32))
            .digest('hex')}.jpeg`;
        const fullFilePath = path.join(process.cwd(), 'public', ...pathSegments);

        await fsE.ensureDir(fullFilePath);
        const avatar = await Jimp.read(file.buffer);
        await avatar
            .cover(options.width, options.height)
            .quality(options.quality)
            .writeAsync(path.join(fullFilePath, fileName));
        
        return path.join(...pathSegments, fileName)
    }
}

module.exports = ImageService;
