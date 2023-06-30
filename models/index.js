const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const getListContacts = async () => {
	const contacts = await fs.readFile(contactsPath);
	return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
	const contacts = JSON.parse(await fs.readFile(contactsPath));
	const contactById = contacts.find((contact) => contact.id === contactId);
	return contactById || null;
};

const removeContact = async (contactId) => {
	const contacts = JSON.parse(await fs.readFile(contactsPath));
	const contactById = contacts.findIndex((contact) => contact.id === contactId);
	if (contactById === -1) return null;
	const [removedContact] = contacts.splice(contactById, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return removedContact;
};

const addContact = async (body) => {
	const contacts = JSON.parse(await fs.readFile(contactsPath));

	const newContact = {
		id: nanoid(),
		name: body.name,
		email: body.email,
		phone: body.phone
	};
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
};

const updateContact = async (contactId, body) => {
	const contacts = await getListContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		console.log('Contact not found.');
		return null;
	}
	contacts[index] = { ...contacts[index], ...body };
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contacts[index];
};

module.exports = {
	getListContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact
};
