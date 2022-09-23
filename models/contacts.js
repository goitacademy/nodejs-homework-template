const fs = require('fs/promises');
const path = require('path');

const PATH = path.join(__dirname, 'contacts.json');
const contactsList = async () => JSON.parse(await fs.readFile(PATH, 'utf-8'));
const writeContacts = async contacts => await fs.writeFile(PATH, JSON.stringify(contacts));

const listContacts = async () => await contactsList();

const getContactById = async contactId => {
	const isContact = (await contactsList()).filter(({ id }) => id === contactId);

	return isContact.length === 0 ? null : isContact;
};

const removeContact = async contactId => {
	const contacts = await listContacts();
	const filteredContacts = contacts.filter(({ id }) => id !== contactId);

	if (contacts.length === filteredContacts.length) {
		return null;
	}

	await writeContacts(filteredContacts);

	return true;
};

const addContact = async body => {
	const contacts = await listContacts();

	contacts.push(body);

	await writeContacts(contacts);
};

const updateContact = async (contactId, body) => {
	const findedContact = await getContactById(contactId);
	const { name, email, phone } = body;

	if (!findedContact) {
		return null;
	}

	const [contact] = findedContact;

	name && (contact.name = name);
	email && (contact.email = email);
	phone && (contact.phone = phone);

	await removeContact(contactId);
	await addContact(contact);

	return contact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
