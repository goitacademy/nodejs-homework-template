const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
	const result = await contacts.listContacts();
	res.json(result);
};

const getById = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.getContactById(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

const addNewContact = async (req, res) => {
	const result = await contacts.addContact(req.body);

	res.status(201).json(result);
};

const deleteContact = async (req, res) => {
	const { id } = req.params;
	const result = await contacts.removeContact(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json({
		message: "contact deleted",
	});
};

const updateContactById = async (req, res) => {
	const { id } = req.params;
	const contact = await contacts.updateContact(id, req.body);

	if (!contact) {
		throw HttpError(404, `Not found`);
	}

	res.status(200).json(contact);
};

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getById: ctrlWrapper(getById),
	addNewContact: ctrlWrapper(addNewContact),
	deleteContact: ctrlWrapper(deleteContact),
	updateContactById: ctrlWrapper(updateContactById),
};
