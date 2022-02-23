const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares");
const { User } = require("../../models/user");

const { upload } = require("../../middlewares");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const createError = require("http-errors");

// USERS/CURRENT
router.get("/current", authenticate, async (req, res, next) => {
	res.json({
		email: req.user.email,
	});
});

// USERS/LOGOUT

router.get("/logout", authenticate, async (req, res, next) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });
	res.status(204).send();
});


// USERS/AVATARS
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

router.patch(
	"/avatars",
	authenticate,
	upload.single("avatar"),

	async (req, res, next) => {
		const { _id } = req.user;
		const { path: tempUpload, filename } = req.file;

		if (req.file === undefined) {
			throw createError(400, "File not found");
		}

		try {
			const [extention] = filename.split(".").reverse();
			const newFileName = `${_id}.${extention}`;
			const resultUpload = path.join(avatarsDir, newFileName);
			await fs.rename(tempUpload, resultUpload);

			await Jimp.read(resultUpload).then((file) =>
				file.resize(250, 250).write(`${avatarsDir}\\${newFileName}`)
			);

			const avatarURL = path.join("avatars", newFileName);

			await User.findByIdAndUpdate(_id, { avatarURL });
			res.json({
				avatarURL,
			});
		} catch (error) {
			next(error);
		}
	}
);


module.exports = router;
