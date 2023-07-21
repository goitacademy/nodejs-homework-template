const { requestError } = require('../../helpers');
const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models');
const Jimp = require('jimp');

const avatars = async (req, res, next) => {
	if (!req.file) {
		throw requestError(400, 'File is require!');
	}
	const { filename } = req.file;

	const tmpPath = path.resolve(__dirname, '../../tmp', filename);
	const publicPath = path.resolve(__dirname, '../../public', filename);

	try {
		const updateImg = await Jimp.read(tmpPath);
		await updateImg.resize(250, 250).write(tmpPath);

		await fs.rename(tmpPath, publicPath);
	} catch (error) {
		await fs.unlink(tmpPath);
		throw requestError(500, 'Image processing failed.');
	}

	const userId = req.user._id;
	const result = await User.findByIdAndUpdate(userId, { avatarURL: publicPath }, { new: true });

	res.json({
		user: {
			email: result.email,
			subscription: result.subscription,
			avatarURL: result.avatarURL,
		},
	});
};

module.exports = avatars;
