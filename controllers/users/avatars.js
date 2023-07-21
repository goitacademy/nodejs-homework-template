const { requestError } = require('../../helpers');
const { User } = require('../../models');

const avatars = async (req, res, next) => {
	if (!req.avatarURL) {
		throw requestError(500, 'Image processing failed.');
	}
	const result = await User.findByIdAndUpdate(
		req.user._id,
		{ avatarURL: req.avatarURL },
		{ new: true }
	);
	res.json({
		user: {
			email: result.email,
			subscription: result.subscription,
			avatarURL: result.avatarURL,
		},
	});
};

module.exports = avatars;
