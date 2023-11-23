const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');

const uploadDir = path.join(process.cwd(), 'tmp');

const isAccessible = async path => {
	try {
		await fs.access(path);
		return true;
	} catch (err) {
		return false;
	}
};

const createFolderIfNotExist = async folder => {
	try {
		if (!(await isAccessible(folder))) {
			await fs.mkdir(folder);
		}
	} catch (err) {
		console.log('There is no access to folder');
		process.exit(1);
	}
};

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, uploadDir);
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
	limits: {
		fileSize: 1048576,
	},
});

const upload = multer({ storage: storage });

module.exports = {
	uploadDir,
	createFolderIfNotExist,
	upload,
};
