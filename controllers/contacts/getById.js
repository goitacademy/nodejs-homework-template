const { Contact } = require("../../models/contact");

const { RequestError } = require("../../utils");

const getById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await Contact.findById(contactId);
		if (!contact) {
			throw RequestError(404);
		}
		res.json(contact);
	} catch (error) {
		next(error);
	}
};

module.exports = getById;
