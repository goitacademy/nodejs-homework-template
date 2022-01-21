const getContactsList = require("./getContactsList");
const updateContactsList = require("./updateContactsList");

const removeContact = async (contactId) => {
	const contacts = await getContactsList();
	const contact = contacts.find((el) => el.id === contactId);
	if (!contact) return null;

	await updateContactsList(contacts.filter((el) => el.id !== contactId));
	return contact;
};

module.exports = removeContact;
