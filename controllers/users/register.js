const bcrypt = require('bcrypt');
const { User } = require('../../models');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { sendEmail, messageLayout } = require('../../helpers');

const register = async (req, res, next) => {
	const { email, password } = req.body;

	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);

	const verificationToken = nanoid();

	const result = await User.create({
		email,
		password: hashedPassword,
		avatarURL: gravatar.url(email),
		verificationToken,
	});

	const link = `http://localhost:3000/api/users/verify/${verificationToken}`;

	await sendEmail({
		to: email,
		subject: 'Plase confirm your email',
		html: messageLayout(link),
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
