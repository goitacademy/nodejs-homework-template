const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
	const result = await contacts.listContacts();
	res.json(result);
};

const getContactById = async (req, res) => {
	const { contactId } = req.params;
	const result = await contacts.getContactById(contactId);

	if (!result) {
		throw HttpError(404, "Not Found");
	}

	res.json(result);
};

const addContact = async (req, res) => {
	const result = await contacts.addContact(req.body);
	res.status(201).json(result);
};

const changeContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await contacts.changeContact(contactId, req.body);

	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const removeContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await contacts.removeContact(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}

	res.json({ message: "Contact deleted" });
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	changeContact: ctrlWrapper(changeContact),
	removeContact: ctrlWrapper(removeContact),
};
