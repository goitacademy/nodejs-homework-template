const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require("../models/usersModel")
const userSchema = require("../validation/userValidationSchema")

async function registerUser(req, res, next) {
	const { email, password, subscription } = req.body
	try {
		const { error } = await userSchema.validate(req.body)
		if (error) {
			console.error(error);
			return res.status(400).send({ message: "Validation error, check the required fields or body you sent!" });
		}

		const user = await userModel.findOne({ email }).exec()
		if (user !== null) {
			return res.status(409).send({ message: 'This email is already is use!' })
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const checkedSubscription = subscription || "starter";
		await userModel.create({ email, password: passwordHash, subscription: checkedSubscription })

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
	try {
		const response = await userSchema.validate(req.body)
		if (typeof response.error !== "undefined") {
			console.log(response.error);
			return res.status(401).send({ message: "Missing required field(s)!" });
		}

		const user = await userModel.findOne({ email }).exec()
		if (user === null) {
			return res.status(400).send({ message: 'Email or password is incorrect!' })
		}

		const isPasswordMatching = await bcrypt.compare(password, user.password);
		if (!isPasswordMatching) {
			return res.status(401).send({ message: 'Email or password is incorrect!' })
		}

		const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECREET, { expiresIn: 300 })

		await userModel.findByIdAndUpdate(user._id, { token })

		return res.status(200).send({ message: 'Logged in successfully! Your token will expire in 5 minutes.', token })
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
	try {
		const [bearer, token] = authHeader.split(" ", 2)
		if (bearer !== "Bearer") {
			return res.status(401).send({ message: 'No token provided!' })
		}

		const { email, subscription } = await userModel.findOne({ token }).exec()
		console.log({ user: { email, subscription } });
		res.status(200).send({ user: { email, subscription } })
	} catch (error) {
		next(error)
	}
}

module.exports = {
	registerUser,
	logInUser,
	logOutUser,
	getCurrentUser
}
