const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const filePath = path.join(__dirname, "./contacts.json");

const updateContactsList = async (newContacts) => {
	await fs.writeFile(filePath, JSON.stringify(newContacts));
};

const getContactsList = async () => {
	const data = await fs.readFile(filePath);
	const contacts = JSON.parse(data);
	return contacts;
};

const getContactById = async (contactId) => {
	const contacts = await getContactsList();
	const contact = contacts.find((el) => el.id === contactId);
	if (!contact) return null;
	return contact;
};

const addContact = async (body) => {
	const contacts = await getContactsList();
	const newContact = { ...body, id: v4() };

	contacts.push(newContact);
	await updateContactsList(contacts);
	return newContact;
};

const updateContact = async ({ contactId, body }) => {
	const contacts = await getContactsList();
	const idx = contacts.findIndex((el) => el.id === contactId);
	if (idx === -1) return null;

	contacts[idx] = { ...body, id: contactId };
	await updateContactsList(contacts);

	return contacts[idx];
};

const removeContact = async (contactId) => {
	const contacts = await getContactsList();
	const contact = contacts.find((el) => el.id === contactId);
	if (!contact) return null;

	await updateContactsList(contacts.filter((el) => el.id !== contactId));
	return contact;
};

module.exports = {
	getContactsList,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
