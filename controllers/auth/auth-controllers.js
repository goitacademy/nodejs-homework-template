const User = require("../../models/user");
const ctrlWrapper = require("../../decorators");
const { HttpError } = require("../../helpers");
const path = require("path");
const fs = require("fs/promises");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRET } = process.env;

const gravatar = require("gravatar");
const jimp = require("jimp");

const avatarPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) throw HttpError(409, "Email in use");

	const avatar = gravatar.url(email);
	const hashPassword = await bcrypt.hash(password, 10);
	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL: avatar,
	});

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user) throw HttpError(401, "Email or password is wrong");

	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

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

const getCurrent = (req, res) => {
	const { email, subscription } = req.user;

	res.json({
		email,
		subscription,
	});
};

const logout = async (req, res) => {
	const { _id } = req.user;

	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json({});
};

const updAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: oldPath, filename } = req.file;
	const newPath = path.join(avatarPath, filename);

	await fs.rename(oldPath, newPath);

	const avatar = path.join("public", "avatars", filename);

	await jimp.read(`${avatar}`)
		.then(img => {
			return img
				.resize(250, 250)
		})
		.catch((err) => {
			console.error(err);
		});

	await User.findByIdAndUpdate(_id, { avatarURL: avatar }, { new: true });

	res.json({
		avatarURL: avatar,
	})
};

module.exports = {
	signup: ctrlWrapper(signup),
	login: ctrlWrapper(login),
	getCurrent: ctrlWrapper(getCurrent),
	logout: ctrlWrapper(logout),
	updAvatar: ctrlWrapper(updAvatar),
};
