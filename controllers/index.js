const { cntrlWrapper } = require("../helpers");

const getAllContacts = require("./getAllContacts");
const getOneContactById = require("./getOneContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");
const deleteContact = require("./deleteContact");

module.exports = {
	getAllContacts: cntrlWrapper(getAllContacts),
	getOneContactById: cntrlWrapper(getOneContactById),
	addContact: cntrlWrapper(addContact),
	updateContactById: cntrlWrapper(updateContactById),
	updateStatusContact: cntrlWrapper(updateStatusContact),
	deleteContact: cntrlWrapper(deleteContact),
};