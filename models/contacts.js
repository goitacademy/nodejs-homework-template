const fs = require("fs").promises;
const path = require("path");
const uuid = require("react-uuid");
const contactsDB = path.resolve("./models/contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactsDB);
	console.log(JSON.parse(data));
	return JSON.parse(data);
};

const getContactById = async (contactId) => {
	const data = await listContacts();
	const [getById] = data.filter((it) => it.id === contactId);
	return getById;
};

const removeContact = async (contactId) => {
	const data = await listContacts();
	const response = data.filter((item) => item.id !== contactId);
	if (data && response.length === data.length) {
		return false;
	}
	await fs.writeFile(contactsDB, JSON.stringify(response));
	return true;
};

const addContact = async (body) => {
	const { email, name, phone } = body;

	const data = await listContacts();
	const newContact = { name, email, phone, id: uuid() };
	data.push(newContact);
	await fs.writeFile(contactsDB, JSON.stringify(data));
	return data;
};

const updateContact = async (contactId, body) => {};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
