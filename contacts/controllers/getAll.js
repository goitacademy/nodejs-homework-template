const Contacts = require("../../models/contacts");

const getAll = async (_, res) => {
	const result = await Contacts.listContacts();
	res.json(result);
};

module.exports = getAll;