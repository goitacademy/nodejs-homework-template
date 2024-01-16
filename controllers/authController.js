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
		email: newUser.email,
		password: newUser.password,
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

	res.json({
		token,
	});
};
