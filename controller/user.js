const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../services/schemas/user");
const Joi = require("joi");
require("dotenv").config();
const { getUserbyId } = require("../services/index");
const secret = process.env.SECRET;

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
		if (!user || err) {
			return res.status(401).json({
				status: "error",
				code: 401,
				message: "Not authorized",
				data: "Not authorized",
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
			message: "${validation.error.details[0].message}",
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
		res.status(201).json({
			user: {
				email: email,
				subscription: "starter",
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
			message: "${validation.error.details[0].message}",
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
			"An error occurred while getting the contact: ${err}"
		);
	}
};

module.exports = {
	signUpUser,
	loginUser,
	logoutUser,
	getCurrentUser,
	auth,
};
