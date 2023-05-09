const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getOneContactById = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findById(contactId);

	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json(result);
};

module.exports = getOneContactById;