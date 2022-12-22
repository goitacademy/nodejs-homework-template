const contacts = require('../models/contacts')
const { HttpError, ctrlWrapper } = require('../helpers')
const { Joi } = require('../schemas')

const getAll = async (req, res, next) => {
	const result = await contacts.listContacts()
	res.json(result)
}
const getById = async (req, res, next) => {
	const { contactId } = req.params;
	const result = await contacts.getContactById(contactId)
	if (!result) {
		throw HttpError(404, 'Not found')
	}
	res.json(result)
}

const add = async (req, res, next) => {

	const { name, email, phone } = req.body;
	const { error, value } = Joi.validate({ name: name, email: email, phone: phone });

	if (error) {
		throw HttpError(400, error.message)
	}

	if (!name || !email || !phone) {
		throw HttpError(400, "missing required name field")
	}

	const result = await contacts.addContact(name, email, phone)
	res.status(201).json(result)
}
const del = async (req, res, next) => {

	const { contactId } = req.params;
	const result = await contacts.removeContact(contactId)
	if (!result) {
		throw HttpError(404, 'Not found')
	}
	res.json({ message: "contact deleted" })

}

const put = async (req, res, next) => {

	const { contactId } = req.params;
	const { name, email, phone } = req.body;

	const { error, value } = Joi.validate({ name: name, email: email, phone: phone });

	if (error) {
		throw HttpError(400, error.message)
	}

	if (!name || !email || !phone) {
		throw HttpError(400, 'missing fields')
	}
	const result = await contacts.updateContact(contactId, name, email, phone)
	res.json(result)

}
module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	add: ctrlWrapper(add),
	del: ctrlWrapper(del),
	put: ctrlWrapper(put),
}