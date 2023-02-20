const contactsOperations = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
	const contacts = await contactsOperations.listContacts();
	res.json(contacts);
};

const getContactById = async (req, res) => {
	const { contactId } = req.params;

	const contact = await contactsOperations.getContactById(contactId);
	if (!contact) {
		throw HttpError(404, "Not found");
	}
	res.json(contact);
};

const addContact = async (req, res) => {
	const newContact = await contactsOperations.addContact(req.body);
	res.status(201).json(newContact);
};
const removeContact = async (req, res) => {
	const { contactId } = req.params;
	const removeBook = await contactsOperations.removeContact(contactId);
	console.log(removeBook);
	if (!removeBook) {
		throw HttpError(404, "Not found");
	}
	res.json({ message: "Remove success" });
};

const updateContactById = async (req, res) => {
	const { contactId } = req.params;
	const result = await contactsOperations.updateContactById(
		contactId,
		req.body
	);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	removeContact: ctrlWrapper(removeContact),
	updateContactById: ctrlWrapper(updateContactById),
};
