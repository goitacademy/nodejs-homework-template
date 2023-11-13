import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('models', 'contacts.json');

const updateContacts = (contacts) =>
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
	const allContacts = await fs.readFile(contactsPath, 'utf-8');
	return JSON.parse(allContacts);
};

export const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const contact = contacts.find((item) => item.id === contactId);
	return contact || null;
};

export const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = contacts.splice(index, 1);
	await updateContacts(contacts);
	return result;
};

export const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContact = {
		contactId: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await updateContacts(contacts);
	return newContact;
};

export const updateContactById = async (contactId, data) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	contacts[index] = { ...contacts[index], ...data };
	await updateContacts(contacts);
	return contacts[index];
};
