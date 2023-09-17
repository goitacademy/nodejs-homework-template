const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { originalname, path: tmpUpload } = req.file;

	const filename = `${_id}_${originalname}`;
	const resultUpload = path.join(avatarsDir, filename);

	const avatar = await Jimp.read(tmpUpload);

	const width = avatar.getWidth();
	const height = avatar.getHeight();
	const minSide = Math.min(width, height);
	const xOffset = width > height ? (width - minSide) / 2 : 0;
	const yOffset = height > width ? (height - minSide) / 2 : 0;

	await avatar
		.crop(xOffset, yOffset, minSide, minSide)
		.resize(250, Jimp.AUTO)
		.writeAsync(resultUpload);

	await fs.unlink(tmpUpload);

	const avatarURL = path.join("avatars", filename);

	await User.findByIdAndUpdate(_id, { avatarURL });

	res.json({ avatarURL });
};

module.exports = updateAvatar;