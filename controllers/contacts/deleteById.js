const contactsService = require("../../models/contacts")
const { HttpError } = require('../../helpers');

const deleteById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const contact = await contactsService.removeContact(id)
		if (!contact) throw HttpError(404, `Not found`)
		res.json({ "message": "contact deleted" });
	}
	catch (error) {
		next(error)
	}
};

module.exports = deleteById;