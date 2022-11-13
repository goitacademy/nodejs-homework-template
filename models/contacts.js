const fs = require("fs").promises;
const path = require("path");
const uuid = require("react-uuid");
const contactsDB = path.resolve("./models/contacts.json");

const listContacts = async () => {
	const data = await fs.readFile(contactsDB);
	return JSON.parse(data);
};

const getContactById = async (contactId) => {
	const data = await listContacts();
	const [getById] = data.filter((it) => it.id === contactId);
	return getById;
};

const removeContact = async (contactId) => {
	const data = await listContacts();
	let removedContact;
	const updatedContacts = data.filter((item) => {
		if (item.id === contactId) {
			removedContact = item;
		}
		return item.id !== contactId;
	});
	await fs.writeFile(contactsDB, JSON.stringify(updatedContacts));
	return removedContact;
};

const addContact = async (body) => {
	const { email, name, phone } = body;

	const data = await listContacts();
	const newContact = { name, email, phone, id: uuid() };
	data.push(newContact);
	await fs.writeFile(contactsDB, JSON.stringify(data));
	return newContact;
};

const updateContact = async (contactId, body) => {
	const data = await listContacts();
	const contact = data.map((elem) => {
		if (elem.id === contactId) {
			return { ...elem, ...body };
		} else {
			return elem;
		}
	});
	await fs.writeFile(contactsDB, JSON.stringify(contact));
	return contact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
