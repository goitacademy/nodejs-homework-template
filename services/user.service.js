const User = require("../models/user.model");

const getUserByToken = async (verificationToken) => {
	return await User.findOne(verificationToken);
};

const getUserByEmailAndUpdate = async (email, userData) => {
    return await User.findOneAndUpdate({ email }, userData);
}

module.exports = {
	getUserByToken,
	getUserByEmailAndUpdate,
};
