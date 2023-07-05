const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateListContacts = async (contacts) => {
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
	const allContacts = await fs.readFile(contactsPath);
	return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
	const allContacts = await listContacts();
	const contacById = allContacts.find((item) => item.id === contactId);
	return contacById || null;
};

const removeContact = async (contactId) => {
	const allContacts = await listContacts();
	const indexContact = allContacts.findIndex((item) => item.id === contactId);
	if (indexContact === -1) return null;
	const [result] = allContacts.splice(indexContact, 1);
	await updateListContacts(allContacts);
	return result;
};

const addContact = async (body) => {
	const allContacts = await listContacts();
	const newContact = {
		id: nanoid(),
		...body,
	};
	allContacts.push(newContact);
	await updateListContacts(allContacts);
	return newContact;
};

const updateContact = async (contactId, body) => {
	const allContacts = await listContacts();
	const indexContact = allContacts.findIndex((item) => item.id === contactId);
	if (indexContact === -1) return null;
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
