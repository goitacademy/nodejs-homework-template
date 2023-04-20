const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
	const result = await fs.readFile(contactsPath);
	const data = JSON.parse(result);
	return data;
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const result = contacts.find(contact => contact.id === contactId);

	return result || null;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex(contact => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return result;
}

async function addContact(data) {
	const contacts = await listContacts();
	const newContact = { id: v4(), ...data };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}
async function updateContact(contactId, data) {
	const contacts = await listContacts();
	const index = contacts.findIndex(item => item.id === contactId);
	if (index === -1) {
		return null;
	}
	contacts[index] = { contactId, ...data };
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return await contacts[index];
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
