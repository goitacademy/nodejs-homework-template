const { removeContact } = require("../models/contacts");
const httpError = require("../helpers/httpError");

const deleteContact = async (req, res) => {
	const { contactId } = req.params;
	const contact = await removeContact(contactId);
	if (!contact) {
		throw httpError(404, "Not found");
	}
	res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
