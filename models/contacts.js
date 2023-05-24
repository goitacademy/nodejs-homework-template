const path = require("path");
const fs = require("fs").promises;
const {v4: uuidv4} = require("uuid");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
	const data = await fs
		.readFile(contactsPath)
		.then(response => JSON.parse(response.toString()))
		.catch(err => console.log(err.message));

	return data;
};

const getContactById = async contactId => {
	const data = await listContacts();

	const matchedContact = data.find(contact => contact.id === contactId);
	if (!matchedContact) return console.error(`Contact with id: "${contactId}" was not found!`);

	return console.table(matchedContact);
};

const removeContact = async contactId => {
	const data = await listContacts();

	const matchedContact = data.find(contact => contact.id === contactId);
	if (!matchedContact) return console.error(`Contact with id: "${contactId}" was not found!`);

	const modifiedContacts = data.filter(contact => contact.id !== contactId);
	await fs
		.writeFile(contactsPath, JSON.stringify(modifiedContacts))
		.then(console.log(`Contact with id: "${contactId}" was succesfully removed!`))
		.catch(err => console.log(err.message));
};

const addContact = async body => {
	const {name, email, phone} = body;
	const data = await listContacts();

	const matchedName = data.find(contact => contact.name === name);
	if (matchedName) return console.error(`Contact with name: "${name}" is exist!`);

	const newContact = {id: uuidv4(), name, email, phone};
	await fs
		.writeFile(contactsPath, JSON.stringify([...data, newContact]))
		.then(console.log(`Contact with name: "${name}" was succesfully created!`))
		.catch(err => console.log(err.message));
};

const updateContact = async (body) => {
	const {id ,name, email, phone} = body;
	const data = await listContacts();

	let matchedContact = data.find(contact => contact.id === id);
	if (!matchedContact) return console.error(`Contact with id: "${id}" was not found!`);

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
