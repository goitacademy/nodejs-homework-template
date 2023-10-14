const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const gravatar = require("gravatar");
const { deleteToken } = require("../services/auth.service");
const multer = require("multer");
const path = require("path");

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

const avatarChanger =  async (req, res, next) => {
	const { avatarURL } = req.user;
	// const upload = multer({
	// 	dest: path.join(__dirname, "tmp"),
	// 	limits: {
	// 		fieldSize: 1048576,
	// 	},
	// });
	try {
		// upload.single('avatarURL')
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
