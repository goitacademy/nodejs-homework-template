const path = require("path");
const fs = require("fs").promises;
const {v4: uuidv4} = require("uuid");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
	try {
		const data = await fs.readFile(contactsPath);
		return JSON.parse(data.toString());
	} catch (err) {
		return err.message;
	}
};

const getContactById = async contactId => {
	try {
		const data = await listContacts();

		const matchedContact = data.find(contact => contact.id === contactId);
		if (!matchedContact) return `Contact with id: "${contactId}" was not found!`;

		return matchedContact;
	} catch (err) {
		return err.message;
	}
};

const removeContact = async contactId => {
	try {
		const data = await listContacts();

		const matchedContact = data.find(contact => contact.id === contactId);
		if (!matchedContact) return `Contact with id: "${contactId}" was not found!`;

		const modifiedContacts = data.filter(contact => contact.id !== contactId);
		await fs.writeFile(contactsPath, JSON.stringify(modifiedContacts));

		return `Contact with id: "${contactId}" was succesfully removed!`;
	} catch (err) {
		return err.message;
	}
};

const addContact = async body => {
	const {name, email, phone} = body;
	if (!name || !email || !phone) return `"message": "missing required name field"`;

	try {
		const data = await listContacts();

		const matchedName = data.find(contact => contact.name === name);
		if (matchedName) return `Contact with name: "${name}" is exist!`;

		const newContact = {id: uuidv4(), name, email, phone};
		await fs.writeFile(contactsPath, JSON.stringify([...data, newContact]));

		return `Contact with name: "${name}" was succesfully created!`;
	} catch (err) {
		return err.message;
	}
};

const updateContact = async body => {
	const {id, name, email, phone} = body;
	const data = await listContacts();

	let matchedContact = data.find(contact => contact.id === id);
	if (!matchedContact) return `Contact with id: "${id}" was not found!`;

	matchedContact = {name, email, phone};
	await fs
		.writeFile(contactsPath, JSON.stringify([...data, matchedContact]))
		.then(console.log(`Contact with name: "${name}" was succesfully updated!`))
		.catch(err => console.log(err.message));
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
