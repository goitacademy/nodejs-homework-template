const path = require("path");
const fs = require("fs").promises;
const {v4: uuidv4} = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

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
		const index = data.findIndex(contact => contact.id === contactId);
		if (index === -1) return null;

		data.splice(index, 1);
		await fs.writeFile(contactsPath, JSON.stringify(data));

		return `Contact with id: "${contactId}" was succesfully removed!`;
	} catch (err) {
		return err.message;
	}
};

const addContact = async body => {
	try {
		const data = await listContacts();
		const matchedName = data.find(contact => contact.name === body.name);
		if (matchedName) return `Contact with name: "${body.name}" is exist!`;

		const newContact = {id: uuidv4(), ...body};
		await fs.writeFile(contactsPath, JSON.stringify([...data, newContact]));

		return `Contact with name: "${body.name}" was succesfully created!`;
	} catch (err) {
		return err.message;
	}
};

const updateContact = async (id, body) => {
	try {
		const data = await listContacts();
		const index = data.findIndex(contact => contact.id === id);
		if (index === -1) return null;

		data[index] = {id, ...body};

		await fs.writeFile(contactsPath, JSON.stringify(data));
		return data[index];
	} catch (err) {
		return err.message;
	}
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
