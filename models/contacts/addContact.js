const { v4 } = require("uuid");

const getContactsList = require("./getContactsList");
const updateContactsList = require("./updateContactsList");

const addContact = async (body) => {
	const contacts = await getContactsList();
	const newContact = { ...body, id: v4() };

	contacts.push(newContact);
	await updateContactsList(contacts);
	return newContact;
};

module.exports = addContact;
