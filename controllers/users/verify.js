const { requestError } = require('../../helpers');
const { User } = require('../../models');

const verify = async (req, res) => {
	const { verificationToken } = req.params;

	const user = await User.findOne({ verificationToken: verificationToken });

	if (!user) {
		throw requestError(404, 'User not found');
	}
	if (user.verified) {
		throw requestError(400, 'User has already verificated');
	}

	await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

	return res.json({ message: 'Verification successful' });
};

module.exports = verify;
