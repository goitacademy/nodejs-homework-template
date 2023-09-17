const getCurrentUser = async (req, res) => {
	const { user } = req;

	res.json({
		email: user.email,
		subscription: user.subscription,
	});
};

module.exports = getCurrentUser;