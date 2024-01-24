import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const signup = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ message: "Email in use" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await User.create({
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			user: {
				email: newUser.email,
				subscription: newUser.subscription,
			},
		});
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Email or password is wrong" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Email or password is wrong" });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		user.token = token;
		await user.save();

		res.status(200).json({
			token,
			user: {
				email: user.email,
				subscription: user.subscription,
			},
		});
	} catch (error) {
		next(error);
	}
};

const logout = async (req, res, next) => {
	try {
		req.user.token = null;
		await req.user.save();

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};

const getCurrentUser = async (req, res, next) => {
	try {
		res.status(200).json({
			email: req.user.email,
			subscription: req.user.subscription,
		});
	} catch (error) {
		next(error);
	}
};

export { signup, login, logout, getCurrentUser };
