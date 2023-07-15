const { requestError } = require('../../helpers');
const { User } = require('../../models');

const logout = async (req, res, next) => {
	const user = req.user;
	if (!user) {
		throw requestError(401, 'Not authorized');
	}
	user.token = '';
	await User.findByIdAndUpdate(user._id, user);
	res.status(204).json();
};

module.exports = logout;
