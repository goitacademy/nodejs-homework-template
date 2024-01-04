const fs = require("node:fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const writeFile = async (contacts) => {
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
};

async function listContacts() {
	const data = await fs.readFile(contactsPath, "utf-8");
	return JSON.parse(data);
}

async function getContactById(id) {
	const contacts = await listContacts();
	const result = contacts.find((contact) => contact.id === id);
	return result || null;
}

async function removeContact(id) {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === id);
	if (index === -1) {
		return null;
	}
	const [result] = contacts.splice(index, 1);
	await writeFile(contacts);
	return result;
}

async function addContact(data) {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		...data,
	};
	contacts.push(newContact);
	await writeFile(contacts);
	return newContact;
}

const updateContact = async (id, data) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === id);
	if (index === -1) {
		return null;
	}
	contacts[index] = { id, ...contacts[index], ...data };
	await writeFile(contacts);
	return contacts[index];
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
