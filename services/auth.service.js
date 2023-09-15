const User = require("../models/user.model");

const deleteToken = async (userId) => {
	await User.findByIdAndUpdate(userId, { token: null }, { new: true });
};

module.exports = {
	deleteToken,
};
