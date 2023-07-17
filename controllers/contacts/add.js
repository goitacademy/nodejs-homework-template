const contactsService = require("../../models/contacts")

const add = async (req, res, next) => {
	try {
		const result = await contactsService.addContact(req.body)
		res.status(201).json(result)
	}
	catch (error) {
		next(error)
	}
}

module.exports = add;