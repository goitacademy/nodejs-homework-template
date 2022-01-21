const getContactsList = require("./getContactsList");
const updateContactsList = require("./updateContactsList");

const updateContact = async ({ contactId, body }) => {
	const contacts = await getContactsList();
	const idx = contacts.findIndex((el) => el.id === contactId);
	if (idx === -1) return null;

	contacts[idx] = { ...body, id: contactId };
	await updateContactsList(contacts);

	return contacts[idx];
};

module.exports = updateContact;
