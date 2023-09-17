const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../services/schemas/user");
const Joi = require("joi");
const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs").promises;
require("dotenv").config();
const { getUserbyId } = require("../services/index");
const secret = process.env.SECRET;

const uploadPath = path.join(process.cwd(), "public", "avatars");

const auth = async (req, res, next) => {
	try {
		const authorization = req.headers.authorization;
		if (!authorization) {
			return res.status(401).json({
				status: false,
				message: "Not authorized",
			});
		}
		req.token = authorization.split(" ")[1];
		const userDetailsFromToken = jwt.verify(req.token, secret);
		const user = await User.findById(userDetailsFromToken.id);
		if (!user || !user.token || user.token !== req.token) {
			return res.status(401).json({
				status: "error",
				code: 401,
				message: "Not authorized",
			});
		}
		req.user = user;
		next();
	} catch (error) {
		error.source = "jwt middleware error";
		next(error);
	}
};

const schema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

const signUpUser = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	const validation = schema.validate({ email, password });
	if (validation.error) {
		return res.status(400).json({
			message: `${validation.error.details[0].message}`,
		});
	}
	if (user) {
		return res.status(409).json({
			message: "Email is already in use",
		});
	}
	try {
		const newUser = new User({ email });
		newUser.setPassword(password);
		await newUser.save();
		const avatarURL = gravatar.url(email);
		res.status(201).json({
			user: {
				email: email,
				subscription: "starter",
				avatarURL,
			},
		});
	} catch (error) {
		next(error);
	}
};

const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	const validation = schema.validate({ email, password });
	if (validation.error) {
		return res.status(400).json({
			message: `${validation.error.details[0].message}`,
		});
	}
	if (!user || !user.validPassword(password)) {
		return res.status(400).json({
			status: "error",
			code: 400,
			message: "Email or password is wrong",
			data: "Bad request",
		});
	}
	const payload = {
		id: user.id,
		email: user.email,
	};
	const token = jwt.sign(payload, secret, { expiresIn: "1h" });
	user.token = token;
	await user.save();
	res.status(200).json({
		data: {
			token,
			user: {
				email: email,
				subscription: "starter",
			},
		},
	});
};

const logoutUser = async (req, res, next) => {
	try {
		const { id } = req.user;
		const user = await getUserbyId(id);
		if (!user) {
			return res.status(404).json("Error! User not found!");
		}
		user.token = null;
		await user.save();
		res.status(204).json();
	} catch (error) {
		res.status(500).json({
			status: "error",
			code: 500,
			message: "An error occurred during logout.",
		});
	}
};

const getCurrentUser = async (req, res, next) => {
	const userId = req.user._id;
	try {
		const user = await getUserbyId(userId);
		if (!user) {
			return res.status(404).json("Error! User not found!");
		}
		const { email, subscription } = user;
		return res.status(200).json({
			status: "success",
			code: 200,
			data: { email, subscription },
		});
	} catch (err) {
		res.status(500).json(
			`An error occurred while getting the contact: ${err}`
		);
	}
};

const updateAvatar = async (req, res, next) => {
	if (!req.file) {
		return res.status(400).json({
			message: "No file uploaded",
		});
	}
	console.log(req.file);
	const id = req.user._id;
	const { path: tmpPath, originalname } = req.file;

	await Jimp.read(tmpPath)
		.then((avatar) => {
			return avatar.resize(250, 250).quality(60).write(tmpPath);
		})
		.catch((e) => {
			console.log(e);
		});

	const fileName = `${id}_${originalname}`;
	const uplodedFile = path.join(uploadPath, fileName);
	await fs.rename(tmpPath, uplodedFile);
	const avatarUrl = path.join("avatars", fileName);
	await User.findByIdAndUpdate(id, { avatarUrl });
	res.status(200).json({
		avatarUrl,
	});
};

module.exports = {
	signUpUser,
	loginUser,
	logoutUser,
	getCurrentUser,
	auth,
	updateAvatar,
};
