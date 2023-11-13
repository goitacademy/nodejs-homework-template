import * as contactsService from '../models/contacts.js';

import HttpError from '../helpers/HttpError.js';

import {
	contactAddSchema,
	contactUpdateById,
} from '../schemas/contact-schemas.js';

const getAllContacts = async (req, res, next) => {
	try {
		const result = await contactsService.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
		// res.status(500).json({
		// 	message: error.message,
		// });
	}
};

const getById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contactsService.getContactById(contactId);
		if (!result) {
			throw HttpError(404, `Contact with id=${contactId} not found`);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const add = async (req, res, next) => {
	try {
		const { error } = contactAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const result = await contactsService.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

const updateById = async (req, res, next) => {
	try {
		const { error } = contactUpdateById.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const { contactId } = req.params;
		const result = await contactsService.updateContactById(contactId, req.body);
		if (!result) {
			throw HttpError(404, `Contact with id=${contactId} not found`);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

const deleteById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await contactsService.removeContact();
		if (!result) {
			throw HttpError(404, `Contact with id=${contactId} not found`);
		}
		res.json({
			message: 'Delete success',
		});
	} catch (error) {
		next(error);
	}
};

export default {
	getAllContacts,
	getById,
	add,
	updateById,
	deleteById,
};
