const { addUser, loginUser, logoutUser, getUserDetails, updateUserAvatar } = require("./userControllers");
const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require("./contactControllers");

module.exports = { addUser, loginUser, logoutUser, getUserDetails, updateUserAvatar, listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact };