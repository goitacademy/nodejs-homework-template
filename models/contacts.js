const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");
const { v4 } = require("uuid");

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	const contacts = JSON.parse(data);
	return contacts;
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const result = contacts.find((contact) => contact.id === contactId);
	if (!result) {
		return null;
	}

	return result;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContacts = {
		name,
		email,
		phone,
		id: v4(),
	};
	contacts.push(newContacts);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return newContacts;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const removeContact = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return removeContact;
};

const updateContact = async (contactId, body) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);

	if (index === -1) {
		return null;
	}
	contacts[index] = { ...body, id: contactId };

	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return contacts[index];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
