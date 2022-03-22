const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares");
const { User, schemas } = require("../../models/user");
const { upload } = require("../../middlewares");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const Joi = require("joi");
const createError = require("http-errors");
const { sendMail } = require("../../helpers");

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

//USERS/VERIFY/:VERIFICATIONTOKEN
router.get("/verify/:verificationToken", async (req, res, next) => {
	try {
		const { verificationToken } = req.params;
		const user = await User.findOne(verificationToken);

		if (!user) {
			throw createError(404, "User not found");
		}

		await User.findByIdAndUpdate(user._id, {
			verify: true,
			verificationToken: "",
		});

		res.json({ message: "Verification successful" });
	} catch (error) {
		next(error);
	}
});

//USERS/VERIFY/
router.post("/verify", async (req, res, next) => {
	try {
		const { error } = schemas.verify.validate(req.body);
		if (error) {
			throw createError(400, "Missing required field email");
		}

		const { email } = req.body;
		const user = await User.findOne(email);
		if (user.verify) {
			throw createError(400, "Verification has already been passed");
		}

		const mail = {
			to: email,
			subject: "Подтверждение email",
			html: `<a target ="_blank" href='http://localhost:3000/api/users/${user.verificationToken}'>Нажмите чтобы подтвердить свой email</a>`,
		};

		sendMail(mail);

		res.json({ message: "Verification email sent" });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
