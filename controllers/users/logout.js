const { User } = require('../../model')

const logout = async (req, res) => {
	const user = req.user;
	try {
		await User.findOneAndUpdate({ _id: user.id }, { token: null })
		res.status(200).json("user is loged out")
	}
	catch (error) {
		res.status(400).json({error: error.massage})

	}
}

module.exports = logout;