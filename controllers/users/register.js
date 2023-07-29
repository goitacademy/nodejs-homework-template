const bcrypt = require('bcrypt');
const { User } = require('../../models');
const gravatar = require('gravatar');

const register = async (req, res, next) => {
	const { email, password } = req.body;

	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);

	const result = await User.create({
		email,
		password: hashedPassword,
		avatarURL: gravatar.url(email),
	});
	res.status(201).json({
		user: {
			email,
			subscription: result.subscription,
			avatarURL: result.avatarURL,
		},
	});
};

module.exports = register;
