const { requestError, sendEmail, messageLayout } = require('../../helpers');
const { User } = require('../../models');

const resetVerify = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		throw requestError(400, 'Missing required field email');
	}

	const user = await User.findOne({ email });

	if (user.verify) {
		throw requestError(400, 'Verification has already been passed');
	}

	const link = `http://localhost:3000/api/users/verify/${user.verificationToken}`;

	await sendEmail({
		to: email,
		subject: 'Plase confirm your email',
		html: messageLayout(link),
	});

	return res.json({ message: 'Verification email sent' });
};

module.exports = resetVerify;
