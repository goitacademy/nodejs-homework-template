const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
	return JSON.parse(await fs.readFile(contactsPath));
};

const getContactById = async (id) => {
	console.log(`get contact with id: ${id}`);
	const contacts = await listContacts();
	const contact = contacts.find((item) => id === item.id);
	return contact;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const existingContact = contacts.find(
		(contact) =>
			contact.name.toLowerCase() === name.toLowerCase() ||
			contact.email === email ||
			contact.phone.trim().split("-").join("") === phone.trim().split("-").join("")
	);

	if (existingContact) return null;

	const newContact = { id: v4(), name, email, phone };
	const addedContacts = [...contacts, newContact];
	await fs.writeFile(contactsPath, JSON.stringify(addedContacts));
	return newContact;
};

const removeContact = async (id) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex((item) => item.id === id);
	if (idx === -1) {
		return null;
	}

	const newContacts = contacts.filter((_, index) => idx !== index);
	await fs.writeFile(contactsPath, JSON.stringify(newContacts));

	return contacts[idx];
};

const updateContact = async (id, { name, email, phone }) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex((item) => item.id === id);

	if (idx < 0) return null;

	const newContacts = contacts.map((contact, index) =>
		idx === index ? { id: contact.id, name, email, phone } : contact
	);

	await fs.writeFile(contactsPath, JSON.stringify(newContacts));

	return newContacts[idx];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
