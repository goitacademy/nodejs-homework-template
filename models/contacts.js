const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
	const dataString = await fs.readFile(contactsPath, "utf-8");
	const data = JSON.parse(dataString);
	return data;
};

const getContactById = async (contactId) => {
	const allContacts = await listContacts();
	const contactById = allContacts.find((contact) => contact.id === contactId);
	return contactById || null;
};

const addContact = async (body) => {
	const allContacts = await listContacts();
	const newContact = { id: uuid.v4(), ...body };
	allContacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return newContact;
};

const updateContact = async (contactId, body) => {
	const allContacts = await listContacts();
	const idx = allContacts.findIndex((contact) => contact.id === contactId);
	if (idx !== -1) {
		allContacts[idx] = { ...allContacts[idx], ...body };
		await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
		return allContacts[idx];
	} else {
		return null;
	}
};

const removeContact = async (contactId) => {
	const allContacts = await listContacts();
	const idx = allContacts.findIndex((contact) => contact.id === contactId);
	const removeContactById = allContacts[idx];
	if (idx !== -1) {
		allContacts.splice(idx, 1);
		await fs.writeFile(contactsPath, JSON.stringify(allContacts));
	}
	return removeContactById || null;
};

module.exports = {
	listContacts,
	getContactById,
	addContact,
	updateContact,
	removeContact,
};
