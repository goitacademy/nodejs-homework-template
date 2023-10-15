import { Router } from 'express';
import Joi from 'joi';

import {
	registerUser,
	login,
	getUserById,
	logout,
} from '../../models/users.js';
import authorizationMiddleware from '../../middleware/authorization.js';

const router = Router();
const userRegisterSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
});
const userLoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

router.post('/signup', async (req, res) => {
	const body = req.body;
	let user;
	try {
		user = await userRegisterSchema.validateAsync(body);
	} catch (err) {
		res.status(400).json({ error: err.message });
		return;
	}

	let userInfo;
	try {
		userInfo = await registerUser(user);
	} catch (err) {
		res.status(409).json({ message: err.message });
		return;
	}

	res.status(201).json({ user: userInfo });
});

router.post('/login', async (req, res) => {
	const userDto = req.body;
	try {
		await userLoginSchema.validateAsync(userDto);
	} catch (err) {
		res.status(400).json({ error: err.message });
		return;
	}

	try {
		const userInfo = await login(userDto);
		res.status(200).json(userInfo);
	} catch (err) {
		console.error(err);
		res.status(401).json({ message: 'Email or password is wrong' });
	}
});

router.get('/current', authorizationMiddleware, async (req, res) => {
	let user;
	try {
		user = await getUserById(req.user.id);
	} catch (err) {
		res.status(401).json({ message: err.message });
		return;
	}

	res.status(200).header('Authorization', `Bearer ${user.token}`).json({
		email: user.email,
		subscription: user.subscription,
	});
});

router.get('/logout', authorizationMiddleware, async (req, res, next) => {
	try {
		await logout(req.user.id);
	} catch (err) {
		res.status(401).json({ message: 'Not authorized' });
		return;
	}

	return res.status(204).json({});
});

export default router;
