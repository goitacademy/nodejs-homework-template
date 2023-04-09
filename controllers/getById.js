const { getContactById } = require("../models/contacts");
const httpError = require("../helpers/httpError");

const getById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await getContactById(contactId);
	if (!contact) {
		throw httpError(404, "Not found");
	}
	res.status(200).json(contact);
};

module.exports = getById;
