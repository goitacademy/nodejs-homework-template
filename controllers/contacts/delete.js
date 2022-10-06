const contactsApi = require("../../models/contacts");
const { RequestError } = require("../../utils");

const deleteById = async (req, res, next) => {
	console.log("deleteById working..");
	try {
		const { contactId } = req.params;
		const contact = await contactsApi.removeContact(contactId);
		if (!contact) {
			throw RequestError(404);
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
};

module.exports = deleteById;
