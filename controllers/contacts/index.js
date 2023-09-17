const { ctrlWrapper } = require("../../helpers");

const getAllContacts = require("./getAll");
const getContactById = require("./getById");
const addContact = require("./add");
const deleteContactById = require("./deleteById");
const updateContactById = require("./updateById");
const updateContactStatusById = require("./updateContactStatusById");

module.exports = {
	getAll: ctrlWrapper(getAllContacts),
	getById: ctrlWrapper(getContactById),
	add: ctrlWrapper(addContact),
	deleteById: ctrlWrapper(deleteContactById),
	updateById: ctrlWrapper(updateContactById),
	updateStatusById: ctrlWrapper(updateContactStatusById),
};