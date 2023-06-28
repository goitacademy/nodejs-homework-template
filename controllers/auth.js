const { User } = require("../models/auth");

const { ctrlWrapper, HttpError } = require("../helpers");

const register = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, "Email already in use");
	}
	const newUser = await User.create(req.body);
	res.status(201).json({
		email: newUser.email,
		name: newUser.name,
	});
};
module.exports = {
	register: ctrlWrapper(register),
};
