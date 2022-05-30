const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');

const contactsPath = path.join(__dirname, '../models/contacts.json');

const listContacts = async () => {};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
