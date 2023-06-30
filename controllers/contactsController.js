const contactsService = require('../models');
const { ctrlWrapper } = require('../decorators');
const { HttpError } = require('../helpers');

const getAllContacts = async (req, res) => {
	const result = await contactsService.getListContacts();
	res.json(result);
};

const getOneContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await contactsService.getContactById(contactId);
	if (!result) {
		throw HttpError(404, 'Contact not found');
	}
	res.json(result);
};

const addContact = async (req, res) => {
	const result = await contactsService.addContact(req.body);
	res.status(201).json(result);
};

const deleteContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await contactsService.removeContact(contactId);
	if (!result) {
		throw HttpError(404, 'Contact not found');
	}
	res.json({ message: 'contact deleted' });
};

const updateContactById = async (req, res) => {
	const { contactId } = req.params;
	const result = await contactsService.updateContact(contactId, req.body);
	if (!result) {
		throw HttpError(404, 'Contact not found');
	}
	res.json(result);
};

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getOneContact: ctrlWrapper(getOneContact),
	addContact: ctrlWrapper(addContact),
	deleteContact: ctrlWrapper(deleteContact),
	updateContactById: ctrlWrapper(updateContactById)
};
