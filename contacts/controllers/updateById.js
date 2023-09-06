const Contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const updateById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contacts.updateContact(contactId, req.body);

	if (!result) {
		throw HttpError(404);
	}

	res.json(result);
};

module.exports = updateById;