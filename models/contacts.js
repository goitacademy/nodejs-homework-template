const { readFile, writeFile } = require("fs/promises");
const crypto = require("crypto");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const read = async () => JSON.parse(await readFile(contactsPath, "utf-8"));
const write = async (data) =>
	await writeFile(contactsPath, JSON.stringify(data, null, 2));

const listContacts = async () => await read();

const getContactById = async (contactId) => {
	const contacts = await read();

	const foundContact = contacts.find(({ id }) => id === contactId);

	return foundContact || null;
};

const removeContact = async (contactId) => {
	const contacts = await read();

	const index = contacts.findIndex(({ id }) => id === contactId);

	if (index === -1) return null;

	contacts.splice(index, 1);

	await write(contacts);

	return { message: "Contact deleted" };
};

const addContact = async (body) => {
	const contacts = await read();

	const newContact = { ...body, id: crypto.randomUUID() };

	contacts.push(newContact);

	await write(contacts);

	return newContact;
};

const updateContact = async (contactId, body) => {
	const contacts = await read();

	const index = contacts.findIndex(({ id }) => id === contactId);

	if (index === -1) return null;

	contacts[index] = { ...contacts[index], ...body };

	await write(contacts);

	return contacts[index];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
