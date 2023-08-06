const fs = require("fs/promises");
const path = require("path");

const filepath = path.resolve("models", "contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(filepath, "utf-8");
	return JSON.parse(data);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const contactById = contacts.find((contact) => contact.id === contactId);

	if (!contactById) {
		return null;
	}
	return contactById;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);

	if (index === -1) {
		return null;
	}

	const result = contacts.splice(index, 1)[0];
	await fs.writeFile(filepath, JSON.stringify(contacts, null, 2));

	return result;
};

const addContact = async (body) => {
	const contacts = await listContacts();
	const newContact = {
		name: body.name,
		email: body.email,
		phone: body.phone,
	};
	contacts.push(newContact);

	await fs.writeFile(filepath, JSON.stringify(contacts, null, 2));
	return newContact;
};

const updateContact = async (contactId, body) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);

	if (index === -1) {
		return null;
	}

	const updatedContact = {
		name: body.name,
		email: body.email,
		phone: body.phone,
	};

	contacts[index] = updatedContact;
	await fs.writeFile(filepath, JSON.stringify(contacts, null, 2));

	return updatedContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
