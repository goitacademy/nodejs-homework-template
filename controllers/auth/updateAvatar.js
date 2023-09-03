const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { ctrlWrapper } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: tempUpload, originalname } = req.file;
	const filename = `${_id}_${originalname}`;

	const resultUpload = path.join(avatarsDir, filename);

	Jimp.read(tempUpload).then((image) =>
		image.resize(250, 250).write(resultUpload)
	);

	await fs.rename(tempUpload, resultUpload);

	const avatarURL = path.join("avatars", filename);
	await User.findByIdAndUpdate(_id, { avatarURL });

	res.status(200).json({
		code: 200,
		message: "user successfully updated",
		user: {
			avatarURL,
		},
	});
};

module.exports = ctrlWrapper(updateAvatar);
