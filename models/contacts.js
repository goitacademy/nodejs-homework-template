import fs from "fs/promises";
import path from "path";

import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const readFile = async () => {
	const buf = await fs.readFile(contactsPath);
	const contacts = JSON.parse(buf);
	return contacts;
};

const writeFile = async data => {
	await fs.writeFile(contactsPath, JSON.stringify(data));
};

const listContacts = async () => {
	const contacts = await readFile();
	return contacts;
};

const getContactById = async contactId => {
	const allContacts = await readFile();
	const movie = allContacts.find(el => el.id === contactId);
	return movie || null;
};

const removeContact = async contactId => {
	const allContacts = await readFile();
	const idx = allContacts.findIndex(el => el.id === contactId);

	if (idx === -1) {
		return null;
	}

	const [result] = allContacts.splice(idx, 1);
	writeFile(allContacts);
	return result;
};

const addContact = async body => {
	const allContacts = await readFile();
	const newUser = { id: nanoid(), ...body };
	allContacts.push(newUser);
	writeFile(allContacts);
	return newUser;
};

const updateContact = async (contactId, body) => {
	const allContacts = await readFile();
	const idx = allContacts.findIndex(el => el.id === contactId);

	if (idx === -1) {
		return null;
	}

	const newUser = {
		id: contactId,
		...body,
	};

	allContacts[idx] = newUser;

	writeFile(allContacts);
	return newUser;
};

export { listContacts, getContactById, removeContact, addContact, updateContact };
