const multer = require('multer');
const uuid = require('uuid').v4;
const sharp = require('sharp');
const path = require('path');
const fse = require('fs-extra');
const { HttpError } = require('../utils');


class ImageService {
	static InitUploadImage(name) {
		const multerStorage = multer.memoryStorage();


		const multerFilter = (req, file, cbk) => {
			if (file.mimetype.startsWith('image/')) {
				cbk(null, true);
			} else {
				cbk(new HttpError(400, 'Please, upload images only!!'), false);
			}
		};

		return multer({
			storage: multerStorage,
			fileFilter: multerFilter,
		}).single('avatar');

	}


	static async saveImage(file, options, ...pathSegments) {
		if (file.size > (options?.maxFileSize ? options.maxFileSize * 1024 * 1024 : 1 * 1024 * 1024)) {
			throw new HttpError(400, 'File is too large!');
		}

		const fileName = `${uuid()}.jpeg`;
		const fullFilePath = path.join(process.cwd(), 'public', ...pathSegments);
		await fse.ensureDir(fullFilePath);
		await sharp(file.buffer)
			.resize({ height: options?.height ?? 250, width: options?.width ?? 250 })
			.toFormat('jpeg')
			.jpeg({ quality: 90 })
			.toFile(path.join(fullFilePath, fileName));
		return path.join(...pathSegments, fileName);
	}

}

module.exports = ImageService;