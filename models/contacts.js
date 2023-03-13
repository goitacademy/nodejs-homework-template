const db = require("../service/db");
const { catchAsync, dataValidation } = require("../utils");
/**
 *@param {Object} req
 *@param {Object} res
 * @description get all contacts from database
 */
const listContacts = catchAsync(async (req, res, next) => {
	const contacts = await db.getAllContacts();
	if (contacts.length > 0) {
		res.json(contacts);
	} else {
		res.status(404).json({
			message: "Not found contacts",
		});
	}
});

/**
 * @description get contact by id from database
 *@param {Object} req
 *@param {Object} res
 */
const getContactById = catchAsync(async (req, res, next) => {
	const contact = await db.getContactsById(req.params.contactId);
	res.json(contact);
});

/**
 * @description remove contact from database
 *@param {Object} req
 *@param {Object} res
 */
const removeContact = catchAsync(async (req, res, next) => {
	await db.removeContacts(req.params.contactId);
	res.status(204).json();
});

/**
 * @description add new contact to database
 *@param {Object} req
 *@param {Object} res
 */
const addContact = catchAsync(async (req, res, next) => {
	const { error, value } = dataValidation(req.body);
	if (error) {
		return res.status(400).json({ message: error.message });
	}
	const newContact = await db.createContacts(value);

	res.status(201).json(newContact);
});

/**
 * @description add new contact to database
 *@param {Object} req
 *@param {Object} res
 */
const updateContact = catchAsync(async (req, res, next) => {
	const { error, value } = dataValidation(req.body, false);
	if (error) {
		return res.status(400).json({ message: error.message });
	}
	const updatedContact = await db.updateContacts(req.params.contactId, value);
	res.status(202).json(updatedContact);
});

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
