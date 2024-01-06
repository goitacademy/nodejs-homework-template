import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

import User from "../models/user.js";
import { HttpError, sendEmail } from "../helpers/index.js";

import controllerWrapper from "../decorators/controllerWrapper.js";

dotenv.config();

const { JWT_SECRET, BASE_URL, SENGRID_EMAIL_FROM } = process.env;

const avatarPath = path.resolve("public", "avatars");

const singup = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);
	const verificationToken = nanoid();

	let avatarURL = gravatar.url(email, {
		s: "200",
		r: "pg",
		d: "avatar",
	});

	if (req.file) {
		const { path: oldPath, filename } = req.file;
		const newPath = path.join(avatarPath, filename);
		await fs.rename(oldPath, newPath);
		avatarURL = path.join("avatars", filename);
	}

	const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

	const verifyEmail = {
		to: email,
		from: SENGRID_EMAIL_FROM,
		subject: "Please follow this link below to verify your email",
		text: "To activate your account and start exploring, please click the verification link below",
		html: `<p>Click this link to verify your <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">email</a></p>`,
	  };

	await sendEmail(verifyEmail);

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
			avatarURL: newUser.avatarURL,
		},
	});

};

const verify = async (req, res) => {
	const { verificationToken } = req.params;
	const user = await User.findOne({ verificationToken });

	if (!user) {
		throw HttpError(404, "User not found");
	}

	await User.updateOne({ _id: user._id }, { verify: true, verificationToken: null });

	res.status(200).json({
		message: "Verification is successfull"
	})
};

	const resendVerificationEmail = async( req, res) => {
		const {email} = req.body
		const user = await User.findOne({email})

		if(!user) {
			throw HttpError(400, "Missing required field email")
		}

		if(user.verify) {
			throw HttpError(400, "Verification has already been passed")
		}

		const verifyEmail = {
			to: email,
			from: SENGRID_EMAIL_FROM,
			subject: "Verify email",
			text: "Please verify email",
			html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to verify.</a>`,
		  };

		  await sendEmail(verifyEmail)

		  res.json({
			message: "Verification email sent"
		  })
	}

const singin = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email or password is wrong");
	}

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, "Email or password is wrong");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
};

const signout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json({ message: "Logout succesfull" });
};

const getCurrent = async (req, res) => {
	const { email, subscription } = req.user;
	res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
	const subscribtionOptions = ["starter", "pro", "business"];
	const { subscription } = req.body;
	const { token } = req.user;
	if (!subscribtionOptions.includes(subscription)) {
		throw HttpError(400, "Invalid subscription type");
	}

	const result = await User.findOneAndUpdate({ token }, { subscription }, { new: true });
	res.json(result);
};

const updateAvatar = async (req, res) => {
	const { token } = req.user;
	let avatarURL = req.user.avatarURL;
	if(!req.file) {
		throw HttpError(400, "Avatar file is missing")
	}

		const { path: oldPath, filename } = req.file;
		const newPath = path.join(avatarPath, filename);
		await fs.rename(oldPath, newPath);
		avatarURL = path.join("avatars", filename);
	

	const result = await User.findOneAndUpdate({ token }, { avatarURL }, { new: true });
	if (!result) {
		throw HttpError(404, "User not found");
	}
	if (req.user.avatarURL) {
		const oldAvatarPath = path.join(path.resolve("public", req.user.avatarURL));
		await fs.unlink(oldAvatarPath);
	}

	res.json({
		avatarURL: result.avatarURL,
	});
};

export default {
	singup: controllerWrapper(singup),
	singin: controllerWrapper(singin),
	signout: controllerWrapper(signout),
	getCurrent: controllerWrapper(getCurrent),
	updateSubscription: controllerWrapper(updateSubscription),
	updateAvatar: controllerWrapper(updateAvatar),
	verify: controllerWrapper(verify),
	resendVerificationEmail: controllerWrapper(resendVerificationEmail)
};
