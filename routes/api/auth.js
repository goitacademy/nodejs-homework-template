const express = require("express");
const router = express.Router();
const { User, schemas } = require("../../models/user");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendMail } = require("../../helpers");
const { SECRET_KEY } = process.env;

// SIGNUP
router.post("/signup", async (req, res, next) => {
	try {
		const { error } = schemas.register.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}
		const { email, password, subscription } = req.body;
		const user = await User.findOne({ email });

		if (user) {
			throw createError(409, "Email in use");
		}
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);
		const avatarURL = gravatar.url(email, { protocol: "https" });
		const verificationToken = v4();
		await User.create({
			email,
			avatarURL,
			password: hashPassword,
			verificationToken,
		});

		const mail = {
			to: email,
			subject: "Подтверждение email",
			html: `<a target ="_blank" href='http://localhost:3000/api/users/${verificationToken}'>Нажмите чтобы подтвердить свой email</a>`,
		};

		await sendMail(mail);

		res.status(201).json({
			user: {
				email,
				subscription,
			},
		});
	} catch (error) {
		next(error);
	}
});

// SIGNIN
router.post("/login", async (req, res, next) => {
	try {
		const { error } = schemas.register.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}
		const { email, password, subscription } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			throw createError(401, "Email or password is wrong");
		}

		if (!user.verify) {
			throw createError(401, "Email is not verified");
		}

		const compareResult = await bcrypt.compare(password, user.password);
		if (!compareResult) {
			throw createError(401, "Email or password is wrong");
		}

		const payload = {
			id: user._id,
		};

		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

		await User.findByIdAndUpdate(user._id, { token });

		res.json({
			token,
			user: {
				email,
				subscription,
			},
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
