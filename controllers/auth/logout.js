const { User } = require("../../models/user");

const { ctrlWrapper, HttpError } = require("../../helpers");

const logout = async (req, res) => {
	console.log("logout", req.user);
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json();
};

module.exports = ctrlWrapper(logout);
