const bcrypt = require('bcrypt');
const { User } = require('../../models');

const register = async (req, res, next) => {
	const { email, password } = req.body;

	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);

	const result = await User.create({
		email,
		password: hashedPassword,
	});

	res.status(201).json({
		user: {
			email,
			subscription: result.subscription,
		},
	});
};

module.exports = register;
