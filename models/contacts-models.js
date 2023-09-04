import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
};

const getContactById = async contactId => {
	const allContacts = await listContacts();
	const contact = allContacts.find(contact => contact.id === contactId);
	return contact || null;
};

const removeContact = async contactId => {
	const allContacts = await listContacts();
	const index = allContacts.findIndex(contact => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = allContacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return result;
};

const addContact = async body => {
	const { name, email, phone } = body;

	const allContacts = await listContacts();
	const newContacts = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	allContacts.push(newContacts);
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return newContacts || null;
};

const updateContact = async (contactId, body) => {
	const allContacts = await listContacts();
	const index = allContacts.findIndex(contact => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	allContacts[index] = { id: contactId, ...body };
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return allContacts[index];
};

export default {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
