const { Contact } = require("../../models/contact");
const { RequestError } = require("../../utils");

const deleteById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await Contact.findByIdAndRemove(contactId);
		if (!contact) {
			throw RequestError(404);
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
};

module.exports = deleteById;
