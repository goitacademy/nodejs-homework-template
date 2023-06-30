const { User } = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json({
		message: "Logout success",
	});
};

module.exports = { logout: ctrlWrapper(logout) };
