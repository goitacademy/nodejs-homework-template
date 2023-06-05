// const fs = require('fs/promises')

const fs = require("fs").promises;

const contactsJson = "./models/contacts.json";

const listContacts = async () => {
	return fs.readFile(contactsJson).then((data) => JSON.parse(data));
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {
	console.log("this is my body", body);
};

const updateContact = async (contactId, body) => {};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
