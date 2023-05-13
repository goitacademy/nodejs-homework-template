const listContacts = require("./listContacts");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const addContact = async (body) => {
	const { name, email, phone } = body;
	const contacts = await listContacts();
	const newContact = { name, email, phone, id: uuidv4() };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return newContact;
};

module.exports = addContact;
