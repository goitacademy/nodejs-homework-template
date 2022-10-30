const { User } = require("../../models/user");
const { RequestError } = require("../../utils");
const fs = require("fs/promises");
const getAvatarImageFileName = require("../../utils/getAvatarImageFileName");
const getTempPath = require("../../utils/getTempPath");
const getAvatarsPath = require("../../utils/getAvatarsPath");
const path = require("path");
const resizeByJimp = require("../../utils/resizeByJimp");

const updateAvatar = async (req, res, next) => {
	try {
		if (!req.file) throw RequestError(400);
		const user = await User.findOne({ _id: req.userId });
		if (!user) throw RequestError(401);
		await resizeByJimp(req);
		const fileName = getAvatarImageFileName(req, user._id);
		const tempPath = getTempPath(req);
		const avatarsPath = getAvatarsPath(fileName);
		await fs.rename(tempPath, avatarsPath);
		avatarURL = path.join("avatars", fileName);
		userWithNewAvatarURL = await User.findByIdAndUpdate(
			user._id,
			{ avatarURL },
			{
				new: true,
			}
		);

		res.status(201).json({ avatarURL: userWithNewAvatarURL.avatarURL });
	} catch (error) {
		next(error);
	}
};

module.exports = updateAvatar;
