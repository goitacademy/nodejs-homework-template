const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
require("dotenv").config();

function hashPassword(passwordToHash) {
	const salt = bCrypt.genSaltSync(10);
	const hash = bCrypt.hashSync(passwordToHash, salt);
	return hash;
}

function comparePassword(passwordToHash, hash) {
	const result = bCrypt.compareSync(passwordToHash, hash);
	return result;
}

const getUserByEmial = async (email) => {
	return User.findOne({ email });
};

const register = async ({ email, password }) => {
	try {
		const hashedPassword = await hashPassword(password);
		const newUser = new User({ email, password: hashedPassword });
		await newUser.save();
		return newUser;
	} catch (error) {
		console.error(error);
	}
};

const login = async ({ email, password }) => {
	try {
		const user = await User.findOne({ email });
		if (!user || !comparePassword(password, user.password)) {
			return null;
		} else {
			const token = jwt.sign(
				{
					email: user.email,
					_id: user._id,
				},
				process.env.SECRET_KEY,
				{ expiresIn: "1h" }
			);
			await User.findOneAndUpdate({ _id: user.id }, { $set: { token: token } });

			return await User.findOne({ email });
		}
	} catch (error) {
		console.error(error);
	}
};

const logout = async (id) => {
	try {
		return await User.findOneAndUpdate({ _id: id }, { $set: { token: null } });
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getUserByEmial,
	register,
	login,
	logout,
};
