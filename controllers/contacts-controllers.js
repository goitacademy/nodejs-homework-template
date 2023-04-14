const { ctrlWrapper } = require("../utils/ctrlWrapper");

const contacts = require("../models/contacts");

const { HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
	const result = await contacts.listContacts();
	res.json({ message: "Contacts list array in json format", result });
};

const getContactsById = async (req, res) => {
	const { contactId } = req.params;
	const result = await contacts.getContactById(contactId);
	if (!result) {
		throw HttpError(404, `Not found`);
	}
	res.json({
		message: `Contact with Id: ${req.params.contactId}`,
		result,
	});
};

const addContact = async (req, res) => {
	const result = await contacts.addContact(req.body);
	res.status(201).json(result);
};

const deleteContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await contacts.removeContact(contactId);
	if (!result) {
		throw HttpError(404, `Contact with ${contactId} not found`);
	}
	res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await contacts.updateContact(contactId, req.body);
	if (!result) {
		throw HttpError(404, `Contact with ${contactId} not found`);
	}
	res.json(result);
};

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getContactsById: ctrlWrapper(getContactsById),
	addContact: ctrlWrapper(addContact),
	deleteContact: ctrlWrapper(deleteContact),
	updateContact: ctrlWrapper(updateContact),
};
