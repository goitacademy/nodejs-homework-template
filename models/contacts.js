import fs from "fs/promises";
import path from "path";

import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = (contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


export const listContacts = async () => {
	const result = await fs.readFile(contactsPath);
	console.log(result)
	return JSON.parse(result);
};

export const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const result = contacts.find((contact) => contact.id === contactId);
	return result || null;
};

export const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = contacts.splice(index, 1);
	await updateContacts(contacts);
	return result;
};

export const updateContact = async (contactId, data) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	contacts[index] = { ...contacts[index], ...data };
	await updateContacts(contacts);
	return contacts[index];
};

export const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await updateContacts(contacts);
	return newContact;
};

export default {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
