const { updateContact } = require("../models/contacts");
const httpError = require("../helpers/httpError");

const changeContact = async (req, res) => {
	const contact = await updateContact(req.params.contactId, req.body);
	if (!contact) {
		throw httpError(404, "Not found");
	}
	res.status(200).json(contact);
};

module.exports = changeContact;
