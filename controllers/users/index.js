const { ctrlWrapper } = require("../../helpers");

const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logOutUser = require("./logOutUser");
const getCurrentUser = require("./getCurrentUser");
const updateSubscriptionUser = require("./updateSubscriptionUser");
const updateAvatarUser = require("./updateAvatarUser");

module.exports = {
	register: ctrlWrapper(registerUser),
	login: ctrlWrapper(loginUser),
	logout: ctrlWrapper(logOutUser),
	getCurrent: ctrlWrapper(getCurrentUser),
	updateSubscription: ctrlWrapper(updateSubscriptionUser),
	updateAvatar: ctrlWrapper(updateAvatarUser),
};