/** @format */

const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, '../db/contacts.json');

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactId) {
	const data = await listContacts();
	const contactById = data.find(i => i.id === contactId);
	return contactById || null;
}

async function removeContact(contactId) {
	const data = await listContacts();
	const idx = data.findIndex(i => i.id === contactId);
	if (idx === -1) {
		return null;
	}
	const [dataAfterDel] = data.splice(idx, 1);
	await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
	return dataAfterDel;
}

async function addContact({ name, email, phone }) {
	const data = await listContacts();
	const newContact = { id: nanoid(), name, email, phone };
	data.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
	return newContact;
}
async function updateContact(contactId, { name, email, phone }) {
	const data = await listContacts();
	const newData = data.map(contact => {
		if (contact.id === contactId) {
			return { id: contactId, name, email, phone };
		}
		return contact;
	});
	await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));
	return { id: contactId, name, email, phone };
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
