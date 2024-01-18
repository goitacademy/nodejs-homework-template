import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";

export const register = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user !== null) {
		throw HttpError(409, "Email in use");
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

export const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, "Email or password invalid");
	}

	const passwordCompare = await bcrypt.compare(password, user.password);

	if (!passwordCompare) {
		throw HttpError(401, "Email or password invalid");
	}

	const payload = {
		id: user._id,
	};
	const { SECRET_KEY } = process.env;

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });
	res.status(200).json({
		token,
		user: {
			email,
			subscription: user.subscription,
		},
	});
};

export const getCurrent = async (req, res) => {
	const { email, subscription } = req.user;

	res.status(200).json({
		email,
		subscription,
	});
};
export const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json({
		message: "No Content",
	});
};

export const patchSubscription = async (req, res) => {
	const { _id } = req.user;
	const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json(result);
};
