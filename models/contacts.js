const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

// Read all contacts
const readContacts = async () => {
	try {
		const contacts = await fs.readFile(contactsPath, "utf-8");
		return JSON.parse(contacts);
	} catch (err) {
		console.error(err);
	}
};

// Update contacts
const updateContacts = (contacts) => {
	return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
};

const listContacts = () => readContacts();

// Read contact by id
const getContactById = async (contactId) => {
	try {
		const contacts = await readContacts();
		const contact = contacts.find((contact) => contact.id === contactId);
		return contact;
	} catch (err) {
		console.error(err);
	}
};
// Remove contact by id
const removeContact = async (contactId) => {
	try {
		const contacts = await readContacts();
		const contact = await contacts.find((contact) => contact.id === contactId);
		if (!contact) {
			return contact;
		}
		const newContacts = await contacts.filter((contact) => contact.id !== contactId);
		await updateContacts(newContacts);
		return contact;
	} catch (err) {
		console.error(err);
	}
};

// Add contact
const addContact = async (body) => {
	const { name, email, phone } = body;
	try {
		const contacts = await readContacts();
		const newContact = { name, email, phone, id: nanoid(8) };
		const newContacts = [...contacts, newContact];
		await updateContacts(newContacts);
		return newContact;
	} catch (err) {
		console.error(err);
	}
};

// UpdateContact
const updateContact = async (contactId, body) => {
	try {
		const contacts = await readContacts();
		const idx = contacts.findIndex((contact) => contact.id === contactId);
		if (idx === -1) {
			return null;
		}
		const updatedContact = { ...contacts[idx], ...body };
		contacts[idx] = updatedContact;
		await updateContacts(contacts);
		return updatedContact;
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
