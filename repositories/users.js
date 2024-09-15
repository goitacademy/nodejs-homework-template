import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';

import { User } from '../db.js';
import secret from '../secret.js';
import { sendEmail } from '../emailService.js';

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

	const avatarUrl = gravatar.url(email);

	try {
		const user = new User({
			email,
			password: hash,
			avatarUrl,
			verificationToken: nanoid(),
		});
		await user.save();

		await sendEmail(user.email, user.verificationToken);

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
	if (!user.verify) {
		throw new Error('User not verified');
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

export const getUserByEmail = async (email) => {
	let user;
	try {
		user = await User.findOne({ email });
	} catch (err) {
		console.error(err);
		return;
	}

	return user;
};

export const updateAvatarUrl = async (userId, avatarUrl) => {
	try {
		await User.findOneAndUpdate({ _id: userId, avatarUrl });
	} catch (err) {
		console.error(err);
	}
};

export const verifyUser = async (verificationToken) => {
	try {
		await User.findOneAndUpdate(
			{ verificationToken },
			{ verify: true, verificationToken: null },
			{ new: true }
		);
	} catch (err) {
		console.error(err);
	}
};
