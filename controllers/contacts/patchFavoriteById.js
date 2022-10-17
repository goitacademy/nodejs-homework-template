const { Contact } = require("../../models/contact");
const { RequestError } = require("../../utils");
const { patchFavoriteSchema } = require("../../models/contact");

const patchFavoriteById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const { error } = patchFavoriteSchema.validate(req.body);
		if (error) {
			throw RequestError(400, "missing field favorite");
		}
		const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
			new: true,
		});
		if (!contact) {
			throw RequestError(404);
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
};

module.exports = patchFavoriteById;
