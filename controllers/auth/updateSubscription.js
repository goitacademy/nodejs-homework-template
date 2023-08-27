const { User } = require("../../models/user");

const { HttpError, ctrlWrapper } = require("../../helpers");

const updateSubscription = async (req, res) => {
	const { _id } = req.user;

	const user = await User.findByIdAndUpdate(_id, req.body, {
		new: true,
	});
	if (!user) throw HttpError(401);
	res.status(200).json({
		code: 200,
		message: "user successfully updated",
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
};

module.exports = ctrlWrapper(updateSubscription);
