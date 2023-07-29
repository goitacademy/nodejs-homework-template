const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const ctrlWrapper = require("../../decorators");

const signup = async (req, res) => {
	const newUser = await User.create(req.body);
	
	res.status(201).json({
    user: {
			email: newUser.email,
			subscription: newUser.subscription,
    },
  });
};

module.exports = {
  signup: ctrlWrapper(signup),
};
