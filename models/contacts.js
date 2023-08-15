const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	const response = await fs.readFile(contactsPath);
	return JSON.parse(response);
};

const getContactById = async (contactId) => {
	const response = await listContacts();
	const contactById = response.find((contact) => contact.id === contactId);
	return contactById;
};

const removeContact = async (contactId) => {
	const response = await listContacts();
	const contactIndex = response.map((e) => e.id).indexOf(contactId);
	const updatedList = response.filter((e) => e.id !== `${contactId}`);
	if (contactIndex === -1) {
		console.log("Contact not found!");
	} else {
		await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2));
		return updatedList;
	}
};

const addContact = async (body) => {
	const response = await listContacts();
	const contact = {
		id: nanoid(),
		...body,
	};
	response.push(contact);
	await fs.writeFile(contactsPath, JSON.stringify(response, null, 2));
	return contact;
};

const updateContact = async (contactId, body) => {
	const response = await listContacts();
	const updateContactById = response.map((contact) =>
		contact.id === contactId ? { ...contact, ...body } : contact
	);
	const updatedContact = updateContactById.find(
		(contact) => contact.id === contactId
	);

	await fs.writeFile(
		contactsPath,
		JSON.stringify([...updateContactById], null, 2)
	);

	return updatedContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
