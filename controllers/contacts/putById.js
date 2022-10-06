const contactsApi = require("../../models/contacts");
const { RequestError } = require("../../utils");
const { addSchema } = require("../../schemas");

const putById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const { error } = addSchema.validate(req.body);
		if (error) {
			throw RequestError(400);
		}
		const contact = await contactsApi.updateContact(contactId, req.body);
		if (!contact) {
			throw RequestError(404);
		}
		res.status(201).json(contact);
	} catch (error) {
		next(error);
	}
};

module.exports = putById;
