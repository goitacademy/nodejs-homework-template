const contactsService = require("../../models/contacts");
const { HttpError } = require('../../helpers');

const getById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await contactsService.getContactById(id);

		if (!contact) throw HttpError(404, `Not found`)
		res.json(contact);
	}
	catch (error) {
		next(error);
	}
}

module.exports = getById;
