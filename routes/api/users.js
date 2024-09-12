import { Router } from 'express';
import Joi from 'joi';
import multer from 'multer';

import {
	registerUser,
	login,
	getUserById,
	logout,
	updateAvatarUrl,
} from '../../repositories/users.js';
import authorizationMiddleware from '../../middleware/authorization.js';
import { tmpDirectory, storeAvatar } from '../../repositories/avatars.js';

const router = Router();
const upload = multer({ dest: tmpDirectory });

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

router.patch(
	'/avatars',
	authorizationMiddleware,
	upload.single('avatar'),
	async (req, res) => {
		let user;
		try {
			user = await getUserById(req.user.id);
		} catch (err) {
			res.status(401).json({ message: err.message });
			return;
		}

		try {
			const { avatarUrl, avatarName } = await storeAvatar(user._id, req.file);
			await updateAvatarUrl(user._id, avatarUrl);
			const host = req.headers.host;
			res.status(200).json({ avatarUrl: `http://${host}/api/avatars/${avatarName}` });
			return;
		} catch (err) {
			console.error(err);
		}
	}
);

export default router;
