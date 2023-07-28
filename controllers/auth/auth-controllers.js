const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const ctrlWrapper = require("../../decorators");

const signup = async (req, res) => {
	const newUser = await User.create(req.body);
	
	res.status(201).json({
		name: newUser.name,
		email: newUser.email,
	})
};

module.exports = {
  signup: ctrlWrapper(signup),
};
