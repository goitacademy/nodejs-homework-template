const Contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const deleteById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contacts.removeContact(contactId);

	if (!result) {
		throw HttpError(404);
	}

	res.json({
		message: "contact deleted",
	});
};

module.exports = deleteById;