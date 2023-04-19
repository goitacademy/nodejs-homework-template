const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
	const contacts = await fs.readFile(contactsPath);
	return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const contact = contacts.find((item) => item.id === contactId);
	return contact || null;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return result;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
};

const updateContact = async (contactId, body) => {
	const contacts = await listContacts();

	const contactIndex = contacts.findIndex((item) => item.id === contactId);
	let contact = contacts[contactIndex] || null;
	if (!contact) {
		return null;
	}
	contact = { ...contact, ...body };
	contacts.splice(contactIndex, 1, contact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
