const contacts = require("../models");
const { HttpError, controllersWrapper } = require("../helpers");

const listContacts = async (req, res) => {
	const result = await contacts.listContacts();
	res.json(result);
};

const getContactById = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.getContactById(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

const addContact = async (req, res) => {
	const result = await contacts.addContact(req.body);
	res.status(201).json(result);
};

const removeContact = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.removeContact(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json({ message: "Deleted ))" });
};

const updateContact = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.updateContact(id, req.body);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

module.exports = {
	listContacts: controllersWrapper(listContacts),
	getContactById: controllersWrapper(getContactById),
	addContact: controllersWrapper(addContact),
	removeContact: controllersWrapper(removeContact),
	updateContact: controllersWrapper(updateContact),
};
