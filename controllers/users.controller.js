const User = require('../models/user.schema');
require('dotenv').config();
const service = require('../services/users.service');
const { userValidator, userValidateSubscription } = require('../utils/joi/joi');
const jwt = require('jsonwebtoken');

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
		const newUser = new User({ email, password });
		newUser.setPassword(password);
		await newUser.save();
		const response = {
			user: {
				email: newUser.email,
				subscription: newUser.subscription,
			},
		};
		res.status(201).json({
			status: 'success',
			code: 201,
			data: 'Created',
			ResponseBody: response,
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
		if (!user || !user.validPassword(password)) {
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

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	currentUser,
	updateSubscription,
};
