const User = require('../models/user.schema');
require('dotenv').config();
const { nanoid } = require('nanoid');
const service = require('../services/users.service');
const {
	userValidator,
	userValidateSubscription,
	emailResendValidator,
} = require('../utils/joi/joi');
const sgMail = require('../services/email.service');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');

const secret = process.env.JWT_SECRET;

const registerUser = async (req, res, next) => {
	const { email, password } = req.body;
	const validatedRegistration = userValidator.validate(req.body);
	if (validatedRegistration.error) {
		const errorMessage = validatedRegistration.error.details.map(
			elem => elem.message
		);
		return res.status(400).json({
			status: 'error',
			code: 400,
			data: 'Bad Request',
			ResponseBody: errorMessage,
		});
	}
	const user = await service.getUserByEmail(email);
	if (user) {
		return res.status(409).json({
			status: 'fail',
			code: 409,
			data: 'Conflict',
			ResponseBody: {
				message: 'Email in use',
			},
		});
	}
	try {
		const avatarURL = gravatar.url(email, {
			s: '200',
			r: 'pg',
		});

		const verificationToken = nanoid();
		const newUser = new User({ email, password, avatarURL, verificationToken });
		newUser.setPassword(password);
		await newUser.save();
		if (verificationToken) {
			sgMail.sendVerificationToken(email, verificationToken);
		}
		const response = {
			user: {
				email: newUser.email,
				subscription: newUser.subscription,
				avatarURL: newUser.avatarURL,
			},
		};
		res.status(201).json({
			status: 'success',
			code: 201,
			data: 'Created',
			ResponseBody: response,
			message: `Hello ${email}. Please check your email inbox`,
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	const validatedLogin = userValidator.validate(req.body);
	if (validatedLogin.error) {
		const errorMessage = validatedLogin.error.details.map(elem => elem.message);
		return res.status(400).json({
			status: 'error',
			code: 400,
			data: 'Bad Request',
			ResponseBody: errorMessage,
		});
	}
	try {
		const user = await service.getUserByEmail(email);
		if (!user || !user.validPassword(password) || !user.verify) {
			return res.status(401).json({
				status: 'fail',
				code: 401,
				data: 'Unauthorized',
				ResponseBody: {
					message: 'Email or password is wrong',
				},
			});
		} else {
			const payload = {
				id: user._id,
				email: user.email,
			};

			const token = jwt.sign(payload, secret, { expiresIn: '1h' });
			const response = await service.loginUser(user._id, token);
			return res.status(200).json({
				status: 'success',
				code: 200,
				data: 'OK',
				ResponseBody: {
					token: response.token,
					user: {
						email: response.email,
						subscription: response.subscription,
					},
				},
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const logoutUser = async (req, res, _) => {
	try {
		const { id } = req.user;
		await service.getLogoutUser(id);
		res.status(204).json({});
	} catch (err) {
		console.error(err);
	}
};

const currentUser = async (req, res, _) => {
	try {
		const { id } = req.user;
		const response = await service.getUserById(id);
		res.status(200).json({
			status: 'success',
			code: 200,
			data: 'OK',
			ResponseBody: {
				email: response.email,
				subscription: response.subscription,
			},
		});
	} catch (err) {
		console.error(err);
	}
};

const updateSubscription = async (req, res, next) => {
	try {
		const { error } = userValidateSubscription.validate(req.body);
		if (error)
			return res.status(400).json({
				status: 'error',
				code: 400,
				message: error.details[0].message,
			});
		const { userId } = req.params;
		const { subscription } = req.body;
		const updatedSubscription = await service.updateUserSubscription(
			userId,
			subscription
		);
		if (subscription === undefined || null) {
			res.status(400).json({
				status: 'error',
				code: 400,
				message: 'Missing field subscription',
			});
		}
		if (updatedSubscription) {
			res.status(200).json({
				status: 'success',
				code: 200,
				data: 'OK',
				ResponseBody: {
					updatedSubscription,
				},
			});
		} else {
			res.status(404).json({
				status: 'fail',
				code: 404,
				message: 'Not found',
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const updateAvatar = async (req, res, next) => {
	const { id } = req.user;

	try {
		const storeImage = path.join(process.cwd(), 'public', 'avatars');
		const { path: temporaryName, originalname } = req.file;

		await Jimp.read(`tmp/${originalname}`)
			.then(avatar => {
				return avatar.resize(250, 250).greyscale().write(`tmp/${originalname}`);
			})
			.catch(err => {
				console.error(err);
			});

		const ext = path.extname(originalname);
		const avatarNewName = `avatar-id_${id}${ext}`;
		const fileName = path.join(storeImage, avatarNewName);
		await fs.rename(temporaryName, fileName);

		const avatarNewURL = `/avatars/${avatarNewName}`;
		const response = await service.updateUserAvatar(id, avatarNewURL);

		return res.status(200).json({
			status: 'success',
			code: 200,
			data: 'OK',
			ResponseBody: {
				avatarURL: response.avatarURL,
			},
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const verifyUserByToken = async (req, res, next) => {
	try {
		const { verificationToken } = req.params;
		const response = await service.getUserByverificationToken(
			verificationToken
		);

		if (response) {
			await service.updateUserVerification(response.id);
			res.status(200).json({
				status: 'success',
				code: 200,
				data: 'OK',
				ResponseBody: {
					message: 'Verification successful',
				},
			});
		} else {
			return res.status(404).json({
				status: 'fail',
				code: 404,
				data: 'Not found',
				ResponseBody: {
					message: 'User not found',
				},
			});
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

const resendVerificationMail = async (req, res, next) => {
	const { email } = req.body;
	const { error } = emailResendValidator.validate(req.body);
	if (error) {
		return res.status(400).json({
			status: 'error',
			code: 400,
			data: 'Bad Request',
			ResponseBody: {
				message: 'missing reguired field email',
				error: error.details[0].message,
			},
		});
	}
	try {
		const user = await service.getUserFromBody({ email });

		if (!user) {
			return res.status(400).json({
				status: 'error',
				code: 400,
				message: 'Incorrect email ',
			});
		}
		if (user.verify) {
			return res.status(400).json({
				status: 'error',
				code: 400,
				data: 'Bad Request',
				ResponseBody: {
					message: 'Verification has already been passed',
				},
			});
		}
		const newVerifyToken = user.verificationToken;
		await sgMail.sendVerificationToken(email, newVerifyToken);
		res.status(200).json({
			status: 'success',
			code: 200,
			data: 'OK',
			ResponseBody: {
				message: 'Verification email sent',
			},
		});
	} catch (err) {
		console.error(err);
		next(err);
	}
};

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	currentUser,
	updateSubscription,
	updateAvatar,
	verifyUserByToken,
	resendVerificationMail,
};
