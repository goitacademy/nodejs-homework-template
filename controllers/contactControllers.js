const contactsSchema = require("../schemas/contactsSchema");
const contactsOperations = require("../models/contacts");

async function getAll(req, res, next) {
	try {
		const contacts = await contactsOperations.listContacts();
		res.json({
			status: "success",
			code: 200,
			data: {
				result: contacts,
			},
		});
	} catch (error) {
		next(error);
	}
}

async function getById(req, res, next) {
	try {
		const { contactId } = req.params;
		const result = await contactsOperations.getContactById(contactId);
		if (!result) {
			const error = new Error(`Contact with id-${contactId} not found`);
			error.status = 404;
			throw error;
		}
		res.json({
			status: "success",
			code: 200,
			data: {
				result,
			},
		});
	} catch (error) {
		next(error);
	}
}
async function post(req, res, next) {
	try {
		const { error } = contactsSchema.validate(req.body);
		if (error) {
			error.status = 400;
			throw error;
		}
		const result = await contactsOperations.addContact(req.body);
		res.status(201).json({
			status: "success",
			code: 201,
			data: {
				result,
			},
		});
	} catch (error) {
		next(error);
	}
}
async function deleteById(req, res, next) {
	try {
		const { contactId } = req.params;
		const result = await contactsOperations.getContactById(contactId);
		if (!result) {
			const error = new Error(`Contact with id-${contactId} not found`);
			error.status = 404;
			throw error;
		}
		const deleted = await contactsOperations.removeContact(contactId);

		res.json({
			status: "success",
			code: 200,
			message: "Contact deleted",
			data: {
				deleted,
			},
		});
	} catch (error) {
		next(error);
	}
}
async function putById(req, res, next) {
	try {
		const { error } = contactsSchema.validate(req.body);
		if (error) {
			error.status = 400;
			throw error;
		}
		const { contactId } = req.params;
		const result = await contactsOperations.updateContact(contactId, req.body);
		res.json({
			status: "success",
			code: 200,
			data: {
				result,
			},
		});
	} catch (error) {
		next(error);
	}
}
module.exports = { getAll, getById, post, deleteById, putById };
