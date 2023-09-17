const { User } = require("../../models/user");

const logOutUser = async (req, res) => {
	const { _id } = req.user;

	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).send();
};

module.exports = logOutUser;