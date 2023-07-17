const { requestError } = require('../../helpers');

const current = async (req, res, next) => {
	const user = req.user;
	if (!user) {
		throw requestError(401, 'Not authorized');
	}
	res.json({ email: user.email, subscription: user.subscription });
};

module.exports = current;
