const { User } = require("../../models");

const updateSubscription = async (req, res) => {
	const { _id } = req.user;
	const { subscription } = req.body;

	const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

	return res.status(200).json(result);
};

module.exports = updateSubscription;