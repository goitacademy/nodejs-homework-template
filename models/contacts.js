const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	const contacts = JSON.parse(data);
	return contacts;
};

const getContactById = async (id) => {
	const contacts = await listContacts();
	const result = contacts.find((item) => item.id === id);
	console.log(result);
	if (!result) return null;
	return result;
};

const removeContact = async (id) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex((item) => item.id === id);
	if (idx === -1) return null;
	const [removeContact] = contacts.splice(idx, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return removeContact;
};

const addContact = async (body) => {
	const contacts = await listContacts();
	const newContact = { id: nanoid(), ...body };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return newContact;
};

const updateContact = async (id, body) => {
	const contacts = await listContacts();
	const idx = contacts.findIndex((item) => item.id === id);
	if (idx === -1) return null;
	contacts[idx] = { ...body, id };
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return contacts[idx];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
