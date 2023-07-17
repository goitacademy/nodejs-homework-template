const { requestError } = require('../../helpers');
const { User } = require('../../models');

const updateSubscription = async (req, res, next) => {
	const user = req.user;
	if (!user) {
		throw requestError(401, 'Not authorized');
	}
	const { subscription: newSubscription } = req.body;

	user.subscription = newSubscription;

	await User.findByIdAndUpdate(user._id, user);

	res.json({ email: user.email, subscription: user.subscription });
};

module.exports = updateSubscription;
