import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";

import User from "../models/user.js";
import { HttpError } from "../helpers/index.js";

import controllerWrapper from "../decorators/controllerWrapper.js";

dotenv.config();

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve("public", "avatars");

const singup = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email in use");
	}

	const hashPassword = await bcrypt.hash(password, 10);

	let avatarURL = gravatar.url(email, {
		s: "200",
		r: "pg",
		d: "avatar",
	});
	console.log(avatarURL)

	const { path: oldPath, filename } = req.file;
	const newPath = path.join(avatarPath, filename);
	await fs.rename(oldPath, newPath);
	avatarURL = path.join("avatars", filename);

	const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

	res.status(201).json({
		email: newUser.email,
		subscription: newUser.subscription,
		avatarURL,
	});
};

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
		email: user.email,
		subscription: user.subscription,
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
	let avatarURL = req.user.avatarURL
	const { path: oldPath, filename } = req.file;
	const newPath = path.join(avatarPath, filename);
	await fs.rename(oldPath, newPath);
	avatarURL = path.join("avatars", filename);

	const result = await User.findOneAndUpdate({ token }, { avatarURL }, { new: true });
	if(!result) {
		throw HttpError(404, "User not found")
	}
	if(req.user.avatarURL) {
		const oldAvatarPath = path.join(path.resolve("public", req.user.avatarURL))
		await fs.unlink(oldAvatarPath)
	}

	res.json({
		avatarURL: result.avatarURL
	})
};

export default {
	singup: controllerWrapper(singup),
	singin: controllerWrapper(singin),
	signout: controllerWrapper(signout),
	getCurrent: controllerWrapper(getCurrent),
	updateSubscription: controllerWrapper(updateSubscription),
	updateAvatar: controllerWrapper(updateAvatar)
};
