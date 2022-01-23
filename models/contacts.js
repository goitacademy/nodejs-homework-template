const fs = require('fs/promises')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
	const contacts = JSON.parse(data);
	return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
	const result = contacts.find((contact) => contact.id === contactId);
	if (!result) {
		return null;
	}
	return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const removedContact = contacts[index];
	contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return removedContact;
}

const addContact = async (name, email, phone) => {
  const newContact = { id: shortid.generate(), name, email, phone };
	const contacts = await listContacts();
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return newContact;
}

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	contacts[index] = { id: contacts[index].id, name, email, phone };
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
