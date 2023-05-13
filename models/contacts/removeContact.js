const listContacts = require("./listContacts");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const contactIndex = contacts.findIndex(
		(contact) => contact.id === contactId.toString()
	);
	if (contactIndex === -1) {
		return null;
	}
	const removedContact = contacts[contactIndex];
	contacts.splice(contactIndex, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return removedContact;
};

module.exports = removeContact;
