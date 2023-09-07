const Contacts = require("../../models/contacts");

const getAllContacts = async (_, res) => {
	const result = await Contacts.find({}, "-createdAt -updatedAt");
	res.json(result);
};

module.exports = getAllContacts;