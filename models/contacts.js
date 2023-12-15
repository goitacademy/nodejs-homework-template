const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactsPath, "utf-8");
	return JSON.parse(data);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const contact = contacts.find((c) => c.id === contactId);
	return contact;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const updatedContacts = contacts.filter((c) => c.id !== contactId);
	await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
};

const addContact = async (body) => {
	const contacts = await listContacts();
	const newContact = { id: uuidv4(), ...body };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
};

const updateContact = async (contactId, body) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((c) => c.id === contactId);

	if (index !== -1) {
		contacts[index] = { ...contacts[index], ...body };
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return contacts[index];
	} else {
		throw new Error("Not found");
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
