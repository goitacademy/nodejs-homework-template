/** @format */

const contacts = require('../models');
const { HttpError } = require('../utils');

const listContacts = async (_req, res) => {
	const data = await contacts.listContacts();
	res.json(data);
};

const getContactById = async (req, res) => {
	const { contactId } = req.params;
	const data = await contacts.getContactById(contactId);
	if (!data) {
		throw HttpError(404, 'Not found');
	}
	res.json(data);
};

const removeContact = async (req, res) => {
	const { contactId } = req.params;
	const data = await contacts.removeContact(contactId);
	if (!data) {
		throw HttpError(404, 'Not found');
	}
	res.json({
		message: 'Delete success',
	});
};

const addContact = async (req, res) => {
	const data = await contacts.addContact(req.body);
	res.status(201).json(data);
};

const updateContact = async (req, res) => {
	const { contactId } = req.params;
	const data = await contacts.updateContact(contactId, req.body);
	if (!data) {
		throw HttpError(404, 'Not found');
	}
	res.json(data);
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
