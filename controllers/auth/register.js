/* eslint-disable no-tabs */
const { User } = require('../../models')
const { Conflict } = require('http-errors')

const register = async(req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (!user || !user.comparePassword(password)) {
		throw new Conflict('Email in use')
	}
	await User.create({ email, password })
	res.status(201).json({
		status: 'success',
		code: 201,
		message: 'Registration is successful',
		// data: {
		// 	token
		// }
	})
}

module.exports = register
