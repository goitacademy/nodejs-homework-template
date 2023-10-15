const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const gravatar = require("gravatar");
const { deleteToken } = require("../services/auth.service");
const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

const schema = Joi.object({
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
	password: Joi.string().min(3).max(35).required(),
});
require("dotenv").config();

const login = async (req, res) => {
	const { body } = req;
	const { email, password } = body;
	const { error } = schema.validate(body);
	const user = await User.findOne({ email });

	if (error) {
		return res.status(400).json({
			status: "Bad Request",
			message: error.message,
		});
	} else if (!user || !user.validPassword(password)) {
		return res.status(401).json({
			status: "Unauthorized",
			message: "Email or password is wrong",
		});
	} else {
		const payload = {
			id: user.id,
			username: user.username,
		};

		const token = jwt.sign(payload, process.env.SECRET, {
			expiresIn: "1h",
		});
		return res.status(200).json({
			status: "success",
			data: {
				token,
			},
		});
	}
};

const logout = async (req, res) => {
	const { _id } = req.user;

	await deleteToken(_id.toString());
	return res.status(204).json({
		status: "No Content",
	});
};

const signup = async (req, res, next) => {
	const { body } = req;
	const { email, password } = body;
	const user = await User.findOne({ email }).lean();
	const avatarURL = gravatar.url(email, { default: "identicon" }, true);
	const { error } = schema.validate(body);

	if (user) {
		return res.status(409).json({
			status: "error",
			message: "Email is already in use",
			data: "Conflict",
		});
	} else if (error) {
		return res.status(400).json({
			status: "Bad Request",
			message: error.message,
		});
	}
	try {
		const newUser = new User({ email });
		newUser.setPassword(password);
		newUser.avatarURL = avatarURL;
		await newUser.save();
		return res.status(201).json({
			status: "created",
			data: {
				message: "Registration successful",
			},
		});
	} catch (error) {
		next(error);
	}
};

const current = (req, res) => {
	const { email, subscription, avatarURL } = req.user;
	return res.json({ email, subscription, avatarURL });
};

const avatarChanger = async (req, res, next) => {
	let { avatarURL, email } = req.user;
	try {
		const filename = `${email}_${Date.now()}_${req.file.originalname}`;
		const temporaryFile = path.join(process.cwd(), "tmp");
		await sharp(req.file.path)
			.resize(250, 250)
			.toFile(path.join(temporaryFile, filename));

		await fs.rename(
			path.join(temporaryFile, filename),
			path.join(process.cwd(), "public/avatars", filename)
		);

		avatarURL = `http://localhost:3000/avatars/${filename}`;

		return res.status(200).json({
			status: "OK",
			data: {
				avatarURL,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	login,
	logout,
	signup,
	current,
	avatarChanger,
};
