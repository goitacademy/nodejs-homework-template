import * as bcrypt from 'bcrypt';

import { User } from '../db.js';
import secret from '../secret.js';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const registerUser = async (userDto) => {
	const { email, password } = userDto;

	let hash;
	try {
		hash = await bcrypt.hash(password, saltRounds);
	} catch (err) {
		console.error(err);
		return;
	}

	try {
		const user = new User({ email, password: hash });
		await user.save();

		return {
			email: user.email,
			subscription: user.subscription,
		};
	} catch (err) {
		if (err.code === 11000 && err.keyPattern.email === 1) {
			err.message = 'Email in use';
			throw err;
		}
		console.error(err);
	}
};

export const login = async (userDto) => {
	const { email, password } = userDto;

	let user;
	try {
		user = await User.findOne({ email });
	} catch (err) {
		console.error(err);
		return;
	}

	if (!user) {
		throw new Error('User not found');
	}

	let passwordMatch;
	try {
		passwordMatch = await bcrypt.compare(password, user.password);
	} catch (err) {
		console.error(err);
		return;
	}

	if (!passwordMatch) {
		throw new Error('Password not match');
	}

	const id = user._id;
	const token = jwt.sign({ id }, secret, { expiresIn: '1h' });
	user.token = token;
	try {
		await User.updateOne(user);
	} catch (err) {
		console.error(err);
		return;
	}

	return {
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	};
};

export const logout = async (userId) => {
	try {
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ token: null },
			{ new: true }
		);
	} catch (err) {
		console.error(err);
	}
};

export const getUserById = async (id) => {
	let user;
	try {
		user = await User.findOne({ _id: id });
	} catch (err) {
		console.error(err);
		return;
	}

	return user;
};
