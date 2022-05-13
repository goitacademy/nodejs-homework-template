const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createError } = require('../../helpers')
const { User } = require('../../models')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })
	if (!user) {
		throw createError(401, 'Email is wrong')
	}
	const comparePassword = bcrypt.compareSync(password, user.password)
	if (!comparePassword) {
		throw createError(401, 'Password is wrong')
	}
	const payload = {
		id: user._id,
	}
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
	await User.findByIdAndUpdate(user._id, { token })
	res.json({
		status: 'success',
		code: 200,
		data: { token },
	})
}
module.exports = login
