const Jimp = require('jimp');
const path = require('path');
const { requestError } = require('../helpers');
const fs = require('fs/promises');

const updateImg = async (req, res, next) => {
	if (!req.file) {
		throw requestError(400, 'File is require!');
	}

	const { filename } = req.file;
	const tmpPath = path.resolve(__dirname, '../tmp', filename);
	const publicPath = path.resolve(__dirname, '../public/avatars', filename);
	console.log(tmpPath);
	try {
		const updateImg = await Jimp.read(tmpPath);
		await updateImg.resize(250, 250).write(publicPath);
		await fs.unlink(tmpPath);
	} catch (error) {
		throw requestError(500, 'Image processing failed.');
	}
	req.avatarURL = publicPath;
	next();
};

module.exports = updateImg;
