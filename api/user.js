const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../services/schemas/user");
const Joi = require("joi");
require("dotenv").config();
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
	try {
		await passport.authenticate(
			"jwt",
			{ session: false },
			async (err, user) => {
				if (!user || err) {
					return res.status(401).json({
						status: "error",
						code: 401,
						message: "Unauthorized",
						data: "Unauthorized",
					});
				}

				const authHeader = req.headers.authorization;
				const token = authHeader && authHeader.split(" ")[1];

				const allUsers = await User.find();
				const tokenExists = allUsers.some(
					(user) => user.token === token
				);
				if (!tokenExists) {
					return res.status(401).json({
						status: "error",
						code: 401,
						message: "Token is not authorized",
						data: "Token not authorized",
					});
				}

				req.user = user;
				next();
			}
		)(req, res, next);
	} catch (error) {
		res.status(500).json({
			status: "error",
			code: 500,
			message: "An error occurred during authentication.",
		});
	}
};

const schema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

router.post("/signup", async (req, res, next) => {
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
		res.status(201).json({
			user: {
				email: email,
				subscription: "starter",
			},
		});
	} catch (error) {
		next(error);
	}
});

router.post("/login", async (req, res, next) => {
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
});

router.post("/logout", auth, async (req, res, next) => {
	try {
		const id = req.user.id;

		const user = await User.findById({ _id: id });

		if (!user) {
			return res.status(401).json({
				status: "error",
				code: 401,
				message: "Unauthorized",
			});
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
});

router.get("/current", auth, async (req, res, next) => {
	const { _id: userId } = req.user;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(401).json({ message: "Not authorized" });
		}
		const { email, subscription } = user;
		return res.status(200).json({
			data: { email, subscription },
		});
	} catch (err) {
		res.status(500).json(
			`An error occurred while getting the contact: ${err}`
		);
	}
});

module.exports = router;
