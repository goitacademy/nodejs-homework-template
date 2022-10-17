const { Contact } = require("../../models/contact");
const { RequestError } = require("../../utils");
const { addSchema } = require("../../models/contact");

const putById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const { error } = addSchema.validate(req.body);
		if (error) {
			throw RequestError(400);
		}
		const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
			new: true,
		});
		if (!contact) {
			throw RequestError(404);
		}
		res.status(201).json(contact);
	} catch (error) {
		next(error);
	}
};

module.exports = putById;
