const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const contactSchema = require("../schemas/contact");

const listContacts = async (req, res) => {
	const result = await contacts.listContacts();
	res.status(200).json(result);
};

const getContactById = async (req, res) => {
	const result = await contacts.getContactById(req.params.contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.status(200).json(result);
};

const addContact = async (req, res) => {
	const { error } = contactSchema.validate(req.body);
	if (error) {
		throw HttpError(400, error.details[0].message);
	}

	const result = await contacts.addContact(req.body);
	res.status(201).json(result);
};

const updateContact = async (req, res) => {
	const { error } = contactSchema.validate(req.body);
	if (error) {
		throw HttpError(400, error.details[0].message);
	}

	const result = await contacts.updateContact(req.params.contactId, req.body);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.status(200).json(result);
};

const removeContact = async (req, res) => {
	const result = await contacts.removeContact(req.params.contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	removeContact: ctrlWrapper(removeContact),
	updateContact: ctrlWrapper(updateContact),
};
