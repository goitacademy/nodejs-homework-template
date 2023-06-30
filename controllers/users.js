const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

const { ctrlWrapper, HttpError } = require("../helpers");

const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user) {
		throw HttpError(409, "Email in use");
	}

	// хешуємо пароль npm i bcryptjs
	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({ ...req.body, password: hashPassword });
	res.status(201).json({
		email: newUser.email,
		name: newUser.name,
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	const passwordCompare = await bcrypt.compare(password, user.password);
	// перевіряємо паролі, який ввели з тим, який є, чи співпадають
	if (!user || !passwordCompare) {
		throw HttpError(401, "Email or password is wrong");
	}

	const payload = {
		id: user._id,
	};

	// час життя токену   expiresIn: "23h"
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });

	res.json({
		token,
	});
};

const logout = async (req, res) => {
	const { _id } = req.user;

	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json({
		message: "Logout success",
	});
};

const getcurrent = async (req, res) => {
	const { email, name } = req.user;

	res.json({
		email,
		name,
	});
};

const subscription = async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;
	if (!subscription) {
		throw HttpError(404, "Missing field subscription");
	}
	if (
		subscription !== "starter" &&
		subscription !== "pro" &&
		subscription !== "business"
	) {
		throw HttpError(400, "Wrong field subscription");
	}
	const result = await User.findByIdAndUpdate(
		_id,
		{ subscription },
		{ new: true }
	);
	if (!result) {
		throw HttpError(404, "");
	}

	res.status(201, "subscription update").json({
		subscription: result.subscription,
	});
};

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	logout: ctrlWrapper(logout),
	getcurrent: ctrlWrapper(getcurrent),
	subscription: ctrlWrapper(subscription),
};
