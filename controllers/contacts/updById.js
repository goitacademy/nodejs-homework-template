const contactsService = require("../../models/contacts")
const { HttpError } = require('../../helpers');

const updById = async (req, res, next) => {
	try {
		const { name, email, phone } = req.body;
		if (!name && !email && !phone) throw HttpError(400, "missing fields")
	
		const { id } = req.params;
		const contact = await contactsService.updateContact(id, req.body)

		if (!contact) throw HttpError(404, `Not found`)
		res.json(contact);
	}
	catch (error) {
		next(error);
	}
};

module.exports = updById;

