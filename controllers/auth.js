const { controllerWrp, httpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const createUser = async (req, res) => {
	const { email, password } = req.body;
	const registeredUser = await User.findOne({ email });
	if (registeredUser) {
		throw httpError(409);
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const newUser = await User.create({ ...req.body, password: hashPassword });
	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

const userLogin = async (req, res) => {
	const { email, password } = req.body;
	const registeredUser = await User.findOne({ email });

	if (!registeredUser) {
		throw httpError(401, "Email or password is wrong");
	}
	const isValidPassword = await bcrypt.compare(password, registeredUser.password);
	if (!isValidPassword) {
		throw httpError(401, "Email or password is wrong");
	}

	const payload = { id: registeredUser._id };

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
	await User.findByIdAndUpdate(registeredUser._id, { token });
	res.status(200).json({
		token,
		user: {
			email: registeredUser.email,
			subscription: registeredUser.subscription,
		},
	});
};

const getCurrent = async (req, res) => {
	const { email, subscription } = req.user;
	res.status(200).json({ email, subscription });
};

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: null });
	res.status(204).json({ message: "No content" });
};

const updateSubscription = async (req, res) => {
	const { authorization = "" } = req.headers;
	const token = authorization.split(" ")[1];
	const user = await User.findOne({ token });
	const updatedUserSubscription = await User.findByIdAndUpdate(user._id, req.body, { new: true });
	res.status(200).json(updatedUserSubscription);
};

module.exports = {
	createUser: controllerWrp(createUser),
	userLogin: controllerWrp(userLogin),
	getCurrent: controllerWrp(getCurrent),
	logout: controllerWrp(logout),
	updateSubscription: controllerWrp(updateSubscription),
};
