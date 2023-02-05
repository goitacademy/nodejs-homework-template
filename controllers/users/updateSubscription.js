const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;
	console.log(subscription);
	if (!subscription) {
		res.status(400).json({ message: "missing field subscription" });
	}

	const updateUserSubscription = await User.findByIdAndUpdate(
		_id,
		{ subscription },
		{
			new: true,
			select: "email subscription updatedAt",
		}
	);
	if (!updateUserSubscription) {
		throw new NotFound(`Contact with id=${_id} not found`);
	}

	res.json({
		status: "success",
		code: 200,
		data: {
			result: updateUserSubscription,
		},
	});
};

module.exports = updateSubscription;
