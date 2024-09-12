const Contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const getById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contacts.getContactById(contactId);

	if (!result) {
		throw HttpError(404);
	}

	res.json(result);
};

module.exports = getById;