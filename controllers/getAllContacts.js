const { listContacts } = require("../models/contacts");

const getAllContacts = async (req, res) => {
	const contacts = await listContacts();
	res.json(contacts);
};

module.exports = getAllContacts;
