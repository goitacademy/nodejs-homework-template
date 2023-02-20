const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "contacts.json");

const updateContact = async (books) => {
	await fs.writeFile(filePath, JSON.stringify(books));
};

const listContacts = async () => {
	const data = await fs.readFile(filePath);
	const contacts = JSON.parse(data);
	return contacts;
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();

	const [result] = contacts.filter((item) => item.id === contactId);
	if (!result) {
		return null;
	}
	return result;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex((item) => item.id === contactId);
	if (idx === -1) {
		return null;
	}
	const [result] = contacts.splice(idx, 1);
	await updateContact(contacts);
	return result;
};

const addContact = async (body) => {
	const contacts = await listContacts();
	const newContact = { id: uuidv4(), ...body };
	contacts.push(newContact);
	await updateContact(contacts);
	return newContact;
};

const updateContactById = async (contactId, body) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	contacts[index] = { id: contactId, ...body };
	await updateContact(contacts);
	return contacts[index];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContactById,
};
