const Contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
	const { id } = req.params;
	const result = await Contacts.findById(id, "-createdAt -updatedAt");

	if (!result) {
		throw HttpError(404);
	}

	res.json(result);
};

module.exports = getContactById;