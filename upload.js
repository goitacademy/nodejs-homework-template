const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');

const imageStore = path.join(process.cwd(), 'public', 'avatars');
const uploadDir = path.join(process.cwd(), 'tmp');

// console.log(imageStore, uploadDir)

const extensionWhiteList = ['.jpg', '.jpeg', '.png', '.gif'];
const mimetypeWhiteList = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

const isAccessible = async path => {
	try {
		await fs.access(path);
		return true;
	} catch (e) {
		return false;
	}
};

const createFolderIfNotExist = async folder => {
	try {
		if (!(await isAccessible(folder))) {
			await fs.mkdir(folder);
		}
	} catch (e) {
		console.log('No access to folder');
		process.exit(1);
	}
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
	limits: {
		fileSize: 1048576,
	},
});

const uploadMiddleware = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const extension = path.extname(file.originalname).toLowerCase();
		const mimetype = file.mimetype;
		if (!extensionWhiteList.includes(extension) || !mimetypeWhiteList.includes(mimetype)) {
			return cb(new Error('Wrong file format'));
		}
		return cb(null, true);
	},
	limits: {
		fileSize: 8 * 1024 * 16,
	},
});

module.exports = { storage, uploadDir, imageStore, createFolderIfNotExist, uploadMiddleware };