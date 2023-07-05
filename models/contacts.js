const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
	const allContacts = await fs.readFile(contactsPath);
	return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
	const allContacts = await listContacts();
	const contacById = allContacts.find((item) => item.id === contactId);
	return contacById;
};

const removeContact = async (contactId) => {
	const allContacts = await listContacts();
	const indexContact = allContacts.findIndex((item) => item.id === contactId);
	const [result] = allContacts.splice(indexContact, 1);
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return result;
};

const addContact = async (body) => {
	const allContacts = await listContacts();
	const newContact = {
		id: nanoid(),
		...body,
	};
	allContacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return newContact;
};

const updateContact = async (contactId, body) => {
	const allContacts = await listContacts();
	const indexContact = allContacts.findIndex((item) => item.id === contactId);
	allContacts[indexContact] = { ...allContacts[indexContact], ...body };
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return allContacts[indexContact];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
