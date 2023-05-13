const listContacts = require("./listContacts");
const getContactById = require("./getContactById");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContact = async (contactId, body) => {
	const { name, email, phone } = body;
	const contacts = await listContacts();
	const contact = await getContactById(contactId);
	if (!contact) {
		return null;
	}
	if (name) {
		contact.name = name;
	}
	if (email) {
		contact.email = email;
	}
	if (phone) {
		contact.phone = phone;
	}
	const contactIndex = contacts.findIndex((item) => item.id === contactId);
	contacts[contactIndex] = contact;
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return contact;
};

module.exports = updateContact;
