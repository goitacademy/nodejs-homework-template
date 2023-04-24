const { ctrlWrapper } = require("../../helpers");

const getAllContacts = require("./getAllContacts");
const getOneContactById = require("./getOneContactById");
const addNewContact = require("./addNewContact");
const updateById = require("./updateById");
const updateStatusContact = require("./updateStatusContact");
const deleteContact = require("./deleteContact");

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getOneContactById: ctrlWrapper(getOneContactById),
	addNewContact: ctrlWrapper(addNewContact),
	updateById: ctrlWrapper(updateById),
	updateStatusContact: ctrlWrapper(updateStatusContact),
	deleteContact: ctrlWrapper(deleteContact),
};
