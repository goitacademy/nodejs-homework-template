const { Contact } = require("../../models/contact");

const getAllContacts = async (_, res) => {
	const result = await Contact.find();
	res.status(200).json(result);
};

module.exports = getAllContacts;
