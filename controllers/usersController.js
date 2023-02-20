const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const path = require("path");
const fs = require("fs/promises");

const { User, schemas } = require("../models/users");
const avatarsDir = path.join(process.cwd(), "public", "avatars");

const { SECRET_KEY } = process.env;

const listCurrent = async (req, res) => {
	const { name, email, subscription } = req.user;
	res.json({
		name,
		email,
		subscription,
	});
};

const login = async (req, res) => {
	const { error } = schemas.login.validate(req.body);
	if (error) {
		res.status(400).json({ message: "Incorrect format of entered data " });
		return;
	}
	const { email, password, subscription } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.status(401).json({ message: "Incorrect email or password" });
		return;
	}
	const comparePassword = await bcrypt.compare(password, user.password);
	if (!comparePassword) {
		res.status(401).json({ message: "Incorrect email or password" });
		return;
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
};

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });
	res.status(204).send();
};

const register = async (req, res, next) => {
	const { error } = schemas.register.validate(req.body);
	if (error) {
		res.status(400).json({ message: "Incorrect format of entered data" });
		return;
	}
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		res.status(409).json({ message: "User with this email already exists" });
		return;
	}
	try {
		const hashPassword = await bcrypt.hash(password, 10);
		const hashEmail = await gravatar.url(email);
		const result = await User.create({
			...req.body,
			password: hashPassword,
			avatarURL,
		});

		res.status(201).json({
			user: {
				name: result.name,
				email: result.email,
				subscription: result.subscription,
				avatarURL: hashEmail,
			},
		});
	} catch (e) {
		next(e);
	}
};

const updateAvatar = async (req, res) => {
	try {
		console.log(req.user);
		const { _id } = req.user;
		const { path: tempPath, originalname } = req.file;
		const [extension] = originalname.split(".").reverse();
		const newName = `${_id}.${extension}`;
		const uploadPath = path.join(avatarsDir, newName);
		await fs.rename(tempPath, uploadPath);
		const avatarURL = path.join("avatars", newName);
		await User.findByIdAndUpdate(_id, { avatarURL });
		res.json({
			avatarURL,
		});
	} catch (error) {
		await fs.unlink(req.file.path);
		throw error;
	}
};

module.exports = {
	listCurrent,
	login,
	logout,
	register,
	updateAvatar,
};
