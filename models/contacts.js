const fs = require("fs/promises");
const path = require("node:path");
const shortid = require("shortid");

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = (contacts) =>
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
	const buffer = await fs.readFile(contactsPath);

	return JSON.parse(buffer);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();

	const contact = contacts.find((contact) => contact.id === contactId);
	return contact;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const id = shortid.generate()

	const newContact = { id, name, email, phone, };

	contacts.push(newContact);
	await updateContacts(contacts);
	return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
	const contacts = await listContacts();
	const index = contacts.findIndex(contact => contact.id === id);

	if (index === -1) return null;

	contacts[index] = { id, name, email, phone };

	await updateContacts(contacts)
	return contacts[index];
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);

	if (index === -1) return null;
	
	const [result] = contacts.splice(index, 1);

	await updateContacts(contacts);
	return result;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
