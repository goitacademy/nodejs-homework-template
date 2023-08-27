const fs = require("fs/promises");

const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactsPath, "utf8");
	const contacts = JSON.parse(data);
	return contacts;
};

const getContactById = async contactId => {
	const contacts = await listContacts();
	return contacts.find(contact => contact.id === contactId) || null;
};

const removeContact = async contactId => {
	const contacts = await listContacts();
	const index = contacts.findIndex(contact => contact.id === contactId);

	if (index === -1) {
		return null;
	}
	const removedContact = contacts.splice(index, 1)[0];
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return removedContact;
};

const addContact = async body => {
	const { name, email, phone } = body;
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
	const index = contacts.findIndex(contact => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	contacts[index] = { contactId, ...body };
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contacts[index];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
