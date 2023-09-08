const fs = require("node:fs/promises")
const path = require("node:path")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var gravatar = require('gravatar');
const Jimp = require('jimp')
const userModel = require("../models/usersModel")
const userSchema = require("../validation/userValidationSchema")

async function registerUser(req, res, next) {
	const { email, password, subscription } = req.body

	const { error } = await userSchema.validate(req.body)
	if (error) {
		console.error(error);
		return res.status(400).send({ message: "Validation error, check the required fields or body you sent!" });
	}

	const user = await userModel.findOne({ email }).exec()
	if (user !== null) {
		return res.status(409).send({ message: 'This email is already is use!' })
	}

	try {
		const passwordHash = await bcrypt.hash(password, 10);
		const checkedSubscription = subscription || "starter";
		const avatar = gravatar.url(email, { s: '500' }, true)
		await userModel.create({ email, password: passwordHash, subscription: checkedSubscription, avatar })

		res.status(201).send({
			user: {
				email: email,
				subscription: checkedSubscription
			}
		})
	} catch (error) {
		next(error)
	}
}

async function logInUser(req, res, next) {
	const { email, password } = req.body

	const { error } = await userSchema.validate(req.body)
	if (error) {
		console.error(error);
		return res.status(400).send({ message: "Validation error, check the required fields or body you sent!" });
	}

	const user = await userModel.findOne({ email }).exec()
	if (user === null) {
		return res.status(400).send({ message: 'Email or password is incorrect!' })
	}

	const isPasswordMatching = await bcrypt.compare(password, user.password);
	if (!isPasswordMatching) {
		return res.status(401).send({ message: 'Email or password is incorrect!' })
	}

	try {
		const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECREET, { expiresIn: '1d' })
		// 600

		await userModel.findByIdAndUpdate(user._id, { token })

		return res.status(200).send({ message: 'Logged in successfully! Your Token will expire in 10 minutes.', token })
	} catch (error) {
		next(error)
	}
}

async function logOutUser(req, res, next) {
	try {
		await userModel.findByIdAndUpdate(req.user.id, { token: null })
		res.send({ message: "Logged out successfully!" })
	} catch (error) {
		next(error)
	}
}

async function getCurrentUser(req, res, next) {
	const authHeader = req.headers.authorization

	const [bearer, token] = authHeader.split(" ", 2)
	if (bearer !== "Bearer") {
		return res.status(401).send({ message: 'No token provided!' })
	}

	try {
		const { email, subscription } = await userModel.findOne({ token }).exec()

		res.status(200).send({ user: { email, subscription } })
	} catch (error) {
		next(error)
	}
}

async function changeAvatar(req, res, next) {
	const user = await userModel.findById(req.user.id).exec()
	if (user === null) {
		return res.status(404).send({ message: 'User is not found!' })
	}

	try {
		const oldFilePath = req.file.path;
		const newFilePath = path.join(__dirname, '..', 'public', 'avatars', req.file.filename);

		await fs.rename(oldFilePath, newFilePath);

		const image = await Jimp.read(newFilePath);
		await image.resize(250, 250).writeAsync(newFilePath);

		await userModel.findByIdAndUpdate(req.user.id, { avatar: req.file.filename }, { new: true }).exec()

		res.status(200).send({ message: "Your avatar has been updated successfully. Keep in mind that it has been resized to 250x250 px.", avatarURL: path.join(__dirname, "..", "public", "avatars", req.file.filename) })
	} catch (error) {
		next(error)
	}
}

module.exports = {
	registerUser,
	logInUser,
	logOutUser,
	getCurrentUser,
	changeAvatar
}
