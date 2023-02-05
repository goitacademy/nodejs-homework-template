const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function saveContactsToFile(data) {
	const content = JSON.stringify(data);
	await fs.writeFile(contactsPath, content);
}

async function getContactsFromFile() {
	try {
		return JSON.parse(await fs.readFile(contactsPath, "utf8"));
	} catch (error) {
		return console.error(error.message);
	}
}

const listContacts = async () => {
	const data = await getContactsFromFile();
	console.table(data);
};

const getContactById = async (contactId) => {
	const contacts = await getContactsFromFile();
	const filtredContacts = contacts.find((contact) => contact.id === contactId);
	console.table(filtredContacts);
};

const removeContact = async (contactId) => {
	const contacts = await getContactsFromFile();
	const filtredContacts = contacts.find((contact) => contact.id !== contactId);
	saveContactsToFile(filtredContacts);
	console.table(filtredContacts);
};

const addContact = async (body) => {
	const { name, email, phone } = body;
	const contacts = await getContactsFromFile();
	const newContact = {
		id: Number(contacts[contacts.length - 1].id) + 1,
		name: name,
		email: email,
		phone: phone,
	};
	contacts.push(newContact);
	saveContactsToFile(contacts);
	console.table(contacts);
};

const updateContact = async (contactId, body) => {
	const { name, email, phone } = body;
	const data = await getContactsFromFile();

	const newContact = {
		id: `${contactId}`,
		name: name,
		email: email,
		phone: phone,
	};

	const updateContact = data.find((contact) => contact.id === contactId);

	console.log(updateContact);

	const updateContactId = data.indexOf(updateContact);

	if (updateContactId === -1) {
		return null;
	} else {
		data.splice(updateContactId, 1, newContact);
		await saveContactsToFile(data);
	}
	return newContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
