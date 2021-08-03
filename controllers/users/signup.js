// const Joi = require('joi')
const bcrypt = require('bcrypt')

const { User } = require('../../model')


const signup = async (req, res) => {
	const { email, password } = req.body
	try
	{
		const candidate = await User.findOne({ email })
		if (candidate) {
			return res.status(409).json({
				status: "error",
				code: 409,
				message: "user already registered!"
			})
		}
		const salt = bcrypt.genSaltSync(10)
		const cryptedPassword = bcrypt.hashSync(password, salt)
		const newUser = await User.create({ email, password: cryptedPassword })
		res.status(200).json({email, password: newUser.password})
		
	} catch (error) {res.status(404).json({error: error.message})
		
	}
}

module.exports = signup 