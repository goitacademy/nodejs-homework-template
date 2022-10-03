const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
};

const getContactById = async (contactId) => {
	return (
		(await listContacts()).find(
			(contact) => contact.id === String(contactId)
		) || null
	);
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex(
		(contact) => contact.id === String(contactId)
	);
	if (index === -1) return null;
	const contact = contacts.splice(index, 1);
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contact;
};

const addContact = async (body) => {
	const contacts = await listContacts();
	const id = String(Number(contacts[contacts.length - 1].id) + 1);
	const { name, email, phone } = body;
	const newContact = { id, name, email, phone };
	fs.writeFile(
		contactsPath,
		JSON.stringify([...contacts, newContact], null, 2)
	);
	return newContact;
};

const updateContact = async (contactId, body) => {
	const contacts = await listContacts();
	const index = contacts.findIndex(
		(contact) => contact.id === String(contactId)
	);
	if (index === -1) return null;
	const { name, email, phone } = body;
	const newContact = { id: contactId, name, email, phone };
	contacts.splice(index, 1, newContact);
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
