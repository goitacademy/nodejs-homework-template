const bcrypt = require('bcrypt')
const { User } = require('../../model')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
	const { email, password } = req.body
	try {
			const candidate = await User.findOne({ email })
// console.log(candidate)
		if (!candidate) {
			return res.status(401).json({
				status: 'error',
				code: 401,
				message: 'wrong mail credentials!'
			})
		}
		console.log(password)
		console.log(candidate.password)
		const isPasswordCorrect = bcrypt.compareSync(password, candidate.password)
	 if (!isPasswordCorrect) {
			return res.status(401).json({
				status: 'error',
				code: 401,
				message: 'wrong password credentials!'
			})
		}

		const { JWT_SECRET_KEY } = process.env
		
		const payload = { email, id: candidate._id }
		const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" })
		await User.findOneAndUpdate({ _id: candidate._id }, { token })
		res.status(200).json({token})
	}

	catch (error) { res.status(404).json({ error: error.message }) }
}
module.exports = login