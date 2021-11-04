/* eslint-disable no-tabs */
const { User } = require('../../models')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')

const register = async(req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (user) {
		throw new Conflict('Email in use')
	}
const avatarURL = gravatar.url(email)
const newUSer = new User({ email, password, avatarURL })
newUSer.setPassword(password)
await newUSer.save()
	res.status(201).json({
		status: 'success',
		code: 201,
		message: 'Registration is successful'
	})
}

module.exports = register
