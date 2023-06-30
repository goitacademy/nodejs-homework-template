const { User } = require("../../models/user");

const { ctrlWrapper, HttpError } = require("../../helpers");

const subscription = async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;
	if (!subscription) {
		throw HttpError(404, "Missing field subscription");
	}
	if (
		subscription !== "starter" &&
		subscription !== "pro" &&
		subscription !== "business"
	) {
		throw HttpError(400, "Wrong field subscription");
	}
	const result = await User.findByIdAndUpdate(
		_id,
		{ subscription },
		{ new: true }
	);
	if (!result) {
		throw HttpError(404, "");
	}

	res.status(201, "subscription update").json({
		subscription: result.subscription,
	});
};

module.exports = {
	subscription: ctrlWrapper(subscription),
};
