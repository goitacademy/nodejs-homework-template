const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../services/schemas/user");
const Joi = require("joi");
const { getUserById } = require("../services");
require("dotenv").config();
const secret = process.env.SECRET;

const auth = (req, res, next) => {
	passport.authenticate("jwt", { session: false }, (err, user) => {
		if (!user || err) {
			return res.status(401).json({
				status: "error",
				code: 401,
				message: "Not authorized",
				data: "Unauthorized",
			});
		}
		req.user = user;
		next();
	})(req, res, next);
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
		email: user.email,
		password: user.password,
	};

	const token = jwt.sign(payload, secret, { expiresIn: "1h" });
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

// router.get("/logout");

// router.get("/current", auth, async (req, res, next) => {
// 	const { id: userId } = req.user;
// 	const user = await getUserById(userId);
// 	if (!user) {
// 		return res.status(401).json({ message: "Not authorized" });
// 	}
// 	res.json({
// 		status: "success",
// 		code: 200,
// 		data: {
// 			message: `Authorization was successful: ${id}`,
// 		},
// 	});
// });

module.exports = router;
