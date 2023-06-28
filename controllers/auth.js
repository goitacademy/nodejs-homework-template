const { User } = require("../models/auth");

const { ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
	const newUser = await User.create(req.body);
	res.status(201).json({
		email: newUser.email,
		name: newUser.name,
	});
};
module.exports = {
	register: ctrlWrapper(register),
};
