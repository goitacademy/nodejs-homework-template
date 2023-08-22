const contacts = require("../models/contacts");

const { HttpError } = require("../helpers");

const contactSchema = require("../schemas/contact");

const listContacts = async (req, res, next) => {
	const result = await contacts.listContacts();
	res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
	try {
		const result = await contacts.getContactById(req.params.contactId);
		if (!result) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

const addContact = async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.details[0].message);
		}
		const result = await contacts.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

const removeContact = async (req, res, next) => {
	try {
		const result = await contacts.removeContact(req.params.contactId);
		if (!result) {
			throw HttpError(404, "Not Found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const updateContact = async (req, res, next) => {
	try {
		const result = await contacts.updateContact(req.params.contactId, req.body);
		if (!result) {
			throw HttpError(404, "Not Found");
		}
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
};
