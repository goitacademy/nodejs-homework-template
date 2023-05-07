const { ctrlWrapper } = require("../helpers");

const getAllContacts = require("./getAllContacts");
const getOneContactById = require("./getOneContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");
const deleteContact = require("./deleteContact");

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getOneContactById: ctrlWrapper(getOneContactById),
	addContact: ctrlWrapper(addContact),
	updateContactById: ctrlWrapper(updateContactById),
	updateStatusContact: ctrlWrapper(updateStatusContact),
	deleteContact: ctrlWrapper(deleteContact),
};